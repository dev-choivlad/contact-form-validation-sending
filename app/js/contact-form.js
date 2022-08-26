;(function () {
  class Form {
    constructor(form) {
      this.form = form;

      // Коллекция полей формы, из которых извлекаются данные
      this.fields = this.form.querySelectorAll(".contact-form__input");

      // Кнопка отправки
      this.button = this.form.querySelector(".contact-form__submit")

      // Контейнер с сообщением о том, как прошла отправка формы
      this.formResponceBox = this.form.querySelector(".form-response")

      // Флаг ошибки валидации
      this.isError = false;

      // Обработчики событий
      this.registerEventsHandler();
    }

    static patternName = /^[a-zA-Z\s]+$/;
    static patternEmail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
    static errorMessages = [
      "This field is required",
      "Please enter your full name (at least two letters)",
      "Please enter your valid email",
      "Invalid email format (must contain @ and domain)",
      "Text field can not be empty"
    ];
    static getElement(elem) {
      return elem.nextElementSibling;
    };

    resetForm() {
      for (let field of this.fields) {
          field.value = ""
      }
    };

    disableFormElems() {
      this.button.setAttribute("disabled", "disabled");

      for (let field of this.fields) {
        field.setAttribute("disabled", "disabled");
      }
    };

    enableFormElems() {
      this.button.removeAttribute("disabled");

      for (let field of this.fields) {
        field.removeAttribute("disabled");
      }
    };

    registerEventsHandler() {
      // Запуск валидации формы при нажатии кнопки Submit
      this.button.addEventListener("click", this.validForm.bind(this));

      // Очистка ошибок при установки курсора в поле ввода
      this.form.addEventListener("focus", () => {
        // Находит активный элемент
        const elem = document.activeElement;

        // Если этот элемент не <button type="submit">,
        // Вызывает функцию очистки от текста ошибки
        if (elem === this.button) return;
        this.cleanError(elem);
      }, true);

      // Запуск валидации инпута при потере курсора
      for (let field of this.fields) {
        field.addEventListener("blur", this.validBlurField.bind(this))
      }
    }

    validForm(e) {
      e.preventDefault();

      const formData = new FormData(this.form);
      let errorText;

      for (let property of formData.keys()) {
        errorText = this.getError(formData, property);
        if (errorText.length === 0) continue;
        this.isError = true;

        this.showError(property, errorText);
      }

      if (this.isError) return;

      // Вызов функции, которая отправляет данные формы на сервер
      this.sendFormData(formData);
    }

    validBlurField(e) {
      const target = e.target;
      // Имя поля ввода, потерявшего фокус
      const property = target.getAttribute("name");
      const value = target.value;

      // Создаю пустой объект и записываю в него данные в формате "имя поял": "значение", полученные от поля ввода, потерявшего фокус
      const formData = new FormData();
      formData.append(property, value);

      // Запуская валидацию инпута, потерявшего фокус
      const error = this.getError(formData, property);
      if (error.length === 0) return;

      this.showError(property, error);
    }

    getError(formData, property) {
      let error = "";
      const validate = {
        name: () => {
          if (formData.get("name").length < 2 || Form.patternName.test(formData.get("name")) === false) {
            error = Form.errorMessages[1];
          }
        },

        email: () => {
          if (formData.get("email").length === 0) {
            error = Form.errorMessages[2];
          } else if (Form.patternEmail.test(formData.get("email")) === false) {
            error = Form.errorMessages[3];
          }
        },

        message: () => {
          if (formData.get("message").length === 0) {
            error = Form.errorMessages[4];
          }
        }
      }
      validate[property]();
      return error;
    }

    showError(property, error) {
      const elem = this.form.querySelector(`[name=${property}]`);
      const errorBox = Form.getElement(elem);

      elem.classList.add("contact-form__input--error")
      errorBox.innerHTML = error;
      errorBox.classList.add("active");
    }

    cleanError(elem) {
      const errorBox = Form.getElement(elem);

      elem.classList.remove("contact-form__input--error");
      errorBox.classList.remove("active");

      this.isError = false;
    }

    sendFormData(formData) {
      const that = this;
      //console.log("sendFormData func!");
      this.disableFormElems();

      let xhr = new XMLHttpRequest();

      xhr.open("POST", "/sendmail.php");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            setTimeout(() => {
              that.enableFormElems();
              that.resetForm();
              that.button.classList.add("submitted")
              that.button.innerHTML = "Done";
            }, 1500);

            setTimeout(() => {
              that.button.classList.remove("submitted")
              that.button.innerHTML = "Submit";
            }, 4500);
          }
          if (xhr.status === 500) {
            setTimeout(() => {
              that.enableFormElems();
              that.formResponceBox.innerHTML = "Oops! Something went wrong. Try again.";
              that.formResponceBox.classList.add("active");
            }, 1500);

            setTimeout(() => {
              that.formResponceBox.innerHTML = "";
              that.formResponceBox.classList.remove("active");
            }, 4500);
          }
        }
      };
      xhr.send(formData);
      console.log("the form has been submitted!")
    }
  }

  // Get forms collection
  const forms = document.querySelectorAll(".contact-form");
  if (!forms) return;
  // Form initializing
  for (let form of forms) {
    const f = new Form(form);
  }
})();

