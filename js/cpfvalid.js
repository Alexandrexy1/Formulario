class ValidCPF {
    constructor(cpfInput) {
        this._cpfInput = cpfInput;
    }

    get cpfInput () {
        return this._cpfInput.replace(/\D+/g, '');
    }

    set cpfInput(value) {
        this._cpfInput = value;
    }

    valida () {
        if (!this.cpfInput) return;
        if (this.sequencia()) return;
        const novoCpf = this.geraNovoCpf();
        return novoCpf === this.cpfInput;
    }

    geraNovoCpf () {
        const cpfValida = this.cpfInput.slice(0, -2);
        const digito1 = this.digito(cpfValida);
        const digito2 = this.digito(cpfValida + digito1);
        return cpfValida + digito1 + digito2;
    }

    digito (cpf) {
        const cpfArray = Array.from(cpf);
        let cont = 10;
        if (cpfArray.length > 9) cont = 11;
        const total = cpfArray.reduce(function (ac, num) {
            ac += Number(num) * cont;
            cont--;
            return ac;
        }, 0)
        const digito = 11 - (total % 11);
        return digito > 9 ? 0 : digito;
    }

    sequencia() {
        return this.cpfInput[0].repeat(this.cpfInput.length) === this.cpfInput;
    }
}


