class ValidadeDoForm {
    constructor() {
        this.formulario = document.querySelector('.formulario-criar')
        this.eventos()
    }

    eventos() {
        this.formulario.addEventListener('submit', e => this.handleSubmit(e))
    }

    handleSubmit(e) {
        e.preventDefault()
        const validations = this.validaOn()
    }

    validaOn() {
        let valid = true 
        
        for(let errosMsg of this.formulario.querySelectorAll('.erro-style')) {
            errosMsg.remove()
        }
        
        for(let campo of this.formulario.querySelectorAll('.validade')) {

            let label = campo.previousElementSibling.innerHTML

            // Validade de campos vazios
            if(!campo.value) {
                this.msgErro(campo, `*Campo ${label} não pode estar vazio*`)

                valid = false
            }

            if(campo.classList.contains('name')) {
               if(!this.validaNameNickname(campo, label)) valid = false
               
            }

            if(campo.classList.contains('nickname')) {
                if(!this.validaNameNickname(campo, label)) valid = false
                
             }

             if(campo.classList.contains('usuario')) {
                if(!this.validaUser(campo, label)) valid = false
                
             }
            
             if(campo.classList.contains('cpf')) {
                if(!this.validaCpf(campo, label)) valid = false

             }
        }

    }

    // Validade Nome e Sobrenome(somente letras).
    validaNameNickname(campo, label) {
        const NameOrNick = campo.value
        let valid = true

        if(!NameOrNick.match(/[a-zA-Z]/g)) {
            this.msgErro(campo, `*Campo ${label} deve conter somente letras*`)
            valid = false
        }

        return valid
    }

    validaUser(campo, label) {
        const user = campo.value 
        let valid = true

        if(user.length < 3 || user.length > 12) {
            this.msgErro(campo, `*Campo ${label} deve conter entre 3 e 12 caracteres*`)

            valid = false
        }

        if(!user.match(/[a-zA-z-0-9]+$/)) {
            this.msgErro(campo, `*Campo ${label} deve conter somente letras e números*`)

            valid = false
        }

        return valid
    }

    validaCpf(campo, label) {
        const cpf = campo.value
        const instaceCpf = new ValidaCPF(cpf)
        let valid = true 

        if(!instaceCpf.valida()) {
            this.msgErro(campo, `*${label} inválido!*`)

            valid = false
        }

        return valid
    }

    

    msgErro(campo, msg) {
        const div = document.createElement('div')
        div.setAttribute('class', 'erro-style')
        campo.insertAdjacentElement('afterend', div)
        div.innerHTML = msg
    }
    
}

    
    
const validade = new ValidadeDoForm()
