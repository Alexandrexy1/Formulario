class ValidForm {
    constructor() {
        this.form = document.querySelector('.form');
        this.events();
    }

    // Esse método é onde todos os eventos irão acontecer.
    events () {
        this.form.addEventListener('submit', event => {
            this.handleSubmit(event);
        })
    }

    // Esse segura o submit e faz a checagem dos campos
    handleSubmit(event) {
        event.preventDefault();
        const checkFields = this.checkFields();
        const checkPassword = this.checkPassword();
        if (checkFields && checkPassword) {
            alert('Formulário enviado.');
        }
    }

    // checa se as senhas coincidem e tem o tamanho certo
    checkPassword() {
        let isValid = true;
        const pass = this.form.querySelector('.senha');
        const repeatPass = this.form.querySelector('.repetir-senha');
        
        if (pass.value !== repeatPass.value) {
            this.errorMsg(pass, 'Senha e repetir senha precisam ser iguais')
            this.errorMsg(repeatPass, 'Senha e repetir senha precisam ser iguais');
            isValid = false;
        }
        if (pass.value.length < 6 || pass.value.length > 12) {
            this.errorMsg(pass, 'Senha precisa conter entre 6 a 12 caracteres');
            isValid = false;
        }
        return isValid;
    }

    // Checar os campos e erros específicos
    checkFields() {
        let isValid = true;
        for (let textError of this.form.querySelectorAll('.text-error')) {
            textError.remove();
        }

        for (let field of this.form.querySelectorAll('.isvalid')) {
            const label = field.previousElementSibling.innerHTML;

            if (!field.value) {
                this.errorMsg(field, `Campo ${label} Não pode estar vazio`);
                isValid = false
            }

            if (field.classList.contains('cpf')) {
                if (!this.validCPF(field)) isValid = false; 
            }

            if (field.classList.contains('user')) {
                if (!this.validUser(field)) isValid = false;
            }
        }
        return isValid;
    }

    // pega a classe do arquivo cpfvalid
    validCPF (field) {
        const cpf = new ValidCPF(field.value);
        if (!cpf.valida()) {
            this.errorMsg(field, 'CPF inválido');
            return false;
        }
        return true;
    }

    validUser (field) {
        let isValid = true;
        const user = field.value;
        if (user.length < 3 || user.length > 12) {
            this.errorMsg(field, 'Usuário precisa ter entre 3 e 12 caracteres');
            isValid = false;
        }
        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.errorMsg(field, 'Usuário precisa conter somente letras e/ou números')
            isValid = false;
        }
        return isValid;
    }

    // msg de error no campo
    errorMsg (field, msg) {
       const div = document.createElement('div'); 
       div.innerHTML = msg;
       div.classList.add('text-error');
       field.insertAdjacentElement('afterend', div);
    }
}

const validForm = new ValidForm();