;(function () {
  class Form {
    static patternName = /^[a-zA-Zа-яёА-ЯЁ\s]+$/;
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
    }

    constructor(form) {
      this.form = form;
      // Get collection on inputs from which data will be extracted
      this.fields = this.form.querySelectorAll(".input-group__input");

      // Get submit button
      this.button = this.form.querySelector("[type=submit]")

      // Validation error flag
      this.isError = false;

      // Event Listeners
      this.registerEventsHandler();
    }

    registerEventsHandler() {
      this.button.addEventListener("click", this.validForm.bind(this));

      this.form.addEventListener("focus", () => {
        // Get an active element
        const elem = document.activeElement;

        // Check if this element is not a Submit button
        if (elem === this.button) return;

        // Invoke cleanError function to clean input field
        this.cleanError(elem);
      }, true);

      // Validation of input field when it loses focus
      for (let field of this.fields) {
        field.addEventListener("blur", this.validBlurField.bind(this));
      }
    }

    validForm(e) {
      e.preventDefault();

      // Get an object contains HTML form data
      const formData = new FormData(this.form);

      let error;
      // Loop through the properties of the formData to get a property names
      for (let property of formData.keys()) {
        // Invoke function that compares property values and regex patterns and returns empty string or error text
        error = this.getError(formData, property);
        if (error.length === 0) continue;

        this.isError = true;

        this.showError(property, error);
      }

      if(this.isError) return;

      this.sendFormData(formData);
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
        },
      }

      validate[property]();

      return error;
    }

    showError(property, error) {
      // Get an input with incorrect data
      const elem = this.form.querySelector(`[name=${property}]`);

      // Navigate through the DOM to get related span.input-group__error
      const errorSpan = Form.getElement(elem);

      elem.classList.add("input-group__input--error");
      errorSpan.innerHTML = error;
      errorSpan.classList.add("input-group__error--shown")
    }

    cleanError(elem) {
      const errorSpan = Form.getElement(elem);
      elem.classList.remove("input-group__input--error");
      errorSpan.classList.remove("input-group__error--shown");
      this.isError = false;
    }

    validBlurField(e) {
      const target = e.target;

      // Get name attribute of the input field that lost focus
      const property = target.getAttribute("name");
      // Name attribute value
      const value = target.value;

      // Create an empty object and write data to it in the format 'field_name': 'value' received from the input field that lost focus
      const formData = new FormData();
      formData.append(property, value)

      // Validation of the input field that lost focus
      const error = this.getError(formData, property);
      if (error.length === 0) return;

      this.showError(property, error);
    }

    sendFormData(formData) {
      alert("The form has been submitted")
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/sendmail.php");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // JS logic that handles successful data submission
            // Reset all input fields, etc
            alert("The form has been submitted")
          }
          if (xhr.status === 500) {
            // JS logic that handles failed data submission
            // Show form feedback alert, etc
            alert("Oops! Check you internet connection")
          }
        }
      };
      xhr.send(formData);
    }
  }

  // Get collection of all forms on the page
  const forms = document.querySelectorAll("[name=feedback]");
  if (!forms) return;

  // Iterate over the collection of forms
  for (let form of forms) {
    // Form instantiating
    const f = new Form(form);
  }
})()
