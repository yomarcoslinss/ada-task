import ativarAlert from "./login.js";

const validacoes = {
  validarUsuario(usuario) {
    try {
      const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

      function primeiraLetraMaiuscula(texto) {
        texto = texto.toLowerCase();

        const palavras = texto.split(/\s+/);

        for (let i = 0; i < palavras.length; i++) {
          palavras[i] = palavras[i][0].toUpperCase() + palavras[i].substring(1);
        }

        texto = palavras.join(" ");

        return texto;
      }

      if (!usuario) {
        throw new Error("O campo 'Usuário' não pode estar em branco!");
      }

      if (!regex.test(usuario)) {
        throw new Error("Insira um nome de usuário válido!");
      }

      if (usuario.length > 150) {
        throw new Error("Insira um nome válido!");
      }

      if (usuario.length < 3) {
        throw new Error(
          "O nome de usuário deve possuir pelo menos 3 caracteres."
        );
      }

      usuario = primeiraLetraMaiuscula(usuario);
      return usuario;
    } catch (err) {
      ativarAlert(err.message);
      throw err;
    }
  },

  validarEmail(email) {
    try {
      const regex =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      if (!email) {
        throw new Error("O campo 'Email' não pode estar em branco!");
      }

      if (!regex.test(email)) {
        throw new Error("Insira um email válido!");
      }

      if (email.length < 7) {
        throw new Error("Insira um email válido!");
      }

      email = email.toLowerCase();
      return email;
    } catch (err) {
      ativarAlert(err.message);
      throw err;
    }
  },

  validarSenha(senha) {
    try {
      const regex = /^(?!.*\s)[A-Za-z0-9!@#$%^&*()_+-={}|[\];:'",.<>?]+$/;

      if (!senha) {
        throw new Error("O campo 'Senha' não pode estar em branco!");
      }

      if (!regex.test(senha)) {
        throw new Error("Insira uma senha válida!");
      }

      if (senha.length < 8) {
        throw new Error("A senha deve possuir pelo menos 8 caracteres.");
      }

      if (senha.length > 30) {
        throw new Error("A senha deve ter no máximo 30 caracteres.");
      }

      return senha;
    } catch (err) {
      ativarAlert(err.message);
      throw err;
    }
  },

  validarCheckbox(checkbox) {
    try {
      if (!checkbox.checked) {
        throw new Error("Para continuar, você precisa aceitar os termos da Política de Privacidade");
      }
    } catch (err) {
      ativarAlert(err.message);
      throw err;
    }
  },

  validarCadastroExistente(email) {
    try {
      const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
      listaUser.forEach(user => {
        if(email === user.email){
          throw new Error("Esse email já está cadastrado");
        }

      });
    } catch(err) {
      ativarAlert(err.message);
      throw err;
    }
  }
};

export default validacoes;
