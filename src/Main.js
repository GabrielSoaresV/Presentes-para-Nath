/**
 * Criado por Gabriel para Natasha 💖
 */
import React, { Component } from 'react';
import $ from 'jquery';
import urlReal from './audio/piano.mp3'; // música real
import urlTroll from './audio/ComerTeuCu.mp3'; // música troll

class Main extends Component {
  state = {
    date: {},
  };

  componentDidMount() {
    this.startTyping();
    this.startTimer(2025, 3, 3); // data do início do relacionamento
  }

  startTimer = (year, month, day) => {
    this.updateTime(year, month, day);
    setInterval(() => this.updateTime(year, month, day), 1000);
  };

  updateTime = (year, month, day) => {
    const now = new Date();
    const start = new Date(year, month - 1, day);
    const d = Math.floor((now - start) / (24 * 3600 * 1000));
    const hour = Math.floor(((now - start) / (3600 * 1000)) % 24);
    const minute = Math.floor(((now - start) / (1000 * 60)) % 60);
    const second = Math.floor((now - start) / 1000 % 60);
    this.setState({ date: { d, hour, minute, second } });
  };

  startTyping = () => {
    $.fn.autotype = function () {
      const _this = $(this);
      let fullText = _this.html();
      fullText = fullText.replace(/(\s){2,}/g, "$1");

      const triggerPhrase = 'deixa eu colocar uma música pra tocar! Toque música🎶';
      const triggerIndex = fullText.indexOf(triggerPhrase);

      // Digita até a frase de trigger
      const initialText = fullText.slice(0, triggerIndex + triggerPhrase.length);
      const remainingText = fullText.slice(triggerIndex + triggerPhrase.length);

      _this.html('');

      const typeText = (text, callback) => {
        let i = 0;
        const typer = () => {
          if (i >= text.length) {
            if (callback) callback();
            return;
          }

          const currentChar = text.slice(i, i + 1);
          if (currentChar === '<') {
            i = text.indexOf('>', i) + 1;
          } else {
            i++;
          }

          _this.html(text.substring(0, i));

          setTimeout(typer, 100); // velocidade da digitação (maior = mais lento)
        };
        typer();
      };

      // Adiciona atraso de 3 segundos antes de começar a digitar
      setTimeout(() => {
        typeText(initialText, () => {
          // Inicia música troll
          if (!window.musicStarted) {
            const audioTroll = document.getElementById("audioTroll");
            const audioReal = document.getElementById("audioReal");
            audioTroll.play();
            window.musicStarted = true;

            setTimeout(() => {
              audioTroll.pause();
              audioTroll.currentTime = 0;
              audioReal.play();
            }, 9000); // Troca para música real após 9s
          }

          // Delay antes de digitar o restante do texto
          setTimeout(() => {
            typeText(remainingText);
          }, 7000);
        });
      }, 3000); // <-- atraso inicial de 3 segundos
    };

    $("#autotype").autotype();
  };

  render() {
    const { date } = this.state;

    return (
      <div className="App animated bounceInLeft">
        {/* Contador */}
        <div className="date">
          {date.d !== undefined && (
            <p>
              Nós conhecemos à: <span className="date-text">{date.d}</span> dias{' '}
              <span className="date-text">{date.hour}</span> horas{' '}
              <span className="date-text">{date.minute}</span> minutos{' '}
              <span className="date-text">{date.second}</span> segundos
            </p>
          )}
        </div>
        <br></br>
        <h1 style={{ fontWeight: 900, marginTop: '20px' }}>Para Natasha</h1>

        {/* Texto com efeito de digitação */}
        <div id="autotype">
          <p>
            Espera antes de começar a falar... deixa eu colocar uma música pra tocar! Toque música🎶
            <br />Espera... 😅 essa música não! Melhor essa!
          </p>

          <p>Ótimo essa é perfeita!</p> 
          <p>Então eu queria te dizer.... Sei que você está passando por um tempo difícil e, como eu odeio te ver triste, resolvi fazer uma surpresa pra você. Nada muito grande ou planejado, tive essa ideia agora de manhã quando você me disse que não estava muito bem. Espero que goste.</p>

          <br />
          <h2>Um pequeno poema pra você</h2>

          <p>
            Natasha, minha Mi Amore radiante,<br />
            Com sorriso doce e um charme marcante.<br />
            Ama tulipas que dançam ao vento,<br />
            E seus perfumes que marcam cada momento.
          </p>

          <p>
            No McDonald's, fica feliz, com seu banquete real,<br />
            Entre hambúrgueres e uma Coca Zero, tem uma felicidade sem igual.<br />
            Você fica perfeita com suas pulseiras, colares e anéis dourados,<br />
            Brilhando mais que o sol em dias ensolarados.
          </p>

          <p>
            E quando seu olhar se encontra com o meu,<br />
            O ar aquece, o mundo desaparece e tudo se torna só você e eu.<br />
            Teu jeito doce e sensual me fascina é tão surreal,<br />
            Misturando paixão intensa com ternura, carinho, nada consegue ser igual.
          </p>

          <p>
            Quando hablas en español, no entiendo nada,<br />
            Mas fico perdido, hipnotizado na sua fala, parece até mágica.<br />
            Tu voz me envolve, me prende, me guia,<br />
            E cada palavra soa como uma poesia.
          </p>

          <p>
            Mas confesso, amor, algo em você me intriga,<br />
            Como a doçura dos teus gestos consegue se fundir à força que castiga.<br />
            Há em ti um lado terno, puro e encantador,<br />
            E outro, sombrio, intenso, que impõe respeito e temor.<br />
            Amo-te por completo, em cada cor e contraste,<br />
            Porque até na escuridão, você me envolveu com seu amor. 
          </p>

          <p>
            Pero lo más caro que tengo eres tú, mi amor,<br />
            Meu tesouro eterno, minha flor.
          </p>

          <p>
            Eu te amo muito meu amor!
          </p>

          <div style={{ textAlign: 'right' }}>
            <p>Com amor,</p>
            <p>— Gabriel 💌</p>
          </div>
        </div>

        {/* Áudios */}
        <audio id="audioTroll" src={urlTroll}></audio>
        <audio id="audioReal" src={urlReal}></audio>
      </div>
    );
  }
}

export default Main;
