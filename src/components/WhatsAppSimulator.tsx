import React, { useState } from 'react';
import { MessageSquare, Phone, Check, CheckCheck, Send, ExternalLink, Bot, Sparkles, User, Play } from 'lucide-react';
import { OFFICE_INFO } from '../data/officeData';

export const WhatsAppSimulator: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 1,
      badge: "Passo 1",
      name: "1. Boas-vindas / 1º Contato",
      sender: "bot",
      clientMsg: "Olá, estou precisando de auxílio com um problema perante o Estado.",
      botMsg: `Olá! Seja muito bem-vindo(a) à Leonardo Militão Advogados Associados.\n\nRecebemos sua mensagem. Sabemos que enfrentar o Poder Público ou ter um direito desrespeitado traz angústia e incertezas, mas você não está sozinho(a).\n\nO Dr. Leonardo e a Dra. Juliana já foram notificados da sua mensagem. Para agilizarmos sua análise, nos conte brevemente o que aconteceu e se você já possui algum documento em mãos.`,
      status: "Automático & Imediato"
    },
    {
      id: 2,
      badge: "Passo 2",
      name: "2. Confirmação de Atendimento",
      sender: "bot",
      clientMsg: "Enviei o relato. Conseguimos marcar para amanhã às 14h?",
      botMsg: `Prezado(a), confirmamos com satisfação o seu atendimento!\n\n📅 Data e Horário: Amanhã às 14:00h\n📍 Formato: Presencial em nossa sede (Rua dos Dominicanos, 165 - Sala 401, Serra/BH) ou Videoconferência Online.\n⚖️ Advogados responsáveis: Dr. Leonardo Militão e Dra. Juliana Lemos Costa.\n\nVamos estudar minuciosamente o seu caso. Fale com tranquilidade na sua língua, sem qualquer juridiquês.`,
      status: "Após agendamento"
    },
    {
      id: 3,
      badge: "Passo 3",
      name: "3. Lembrete de Reunião",
      sender: "bot",
      clientMsg: null,
      botMsg: `Olá! Passando apenas para lembrar do nosso encontro de hoje, às 14h.\n\nNossa sala e nossos advogados já estão preparados para recebê-lo(a). Se precisar do link de acesso ou de alguma orientação para chegar ao nosso escritório no Bairro Serra, nos avise por aqui. Até logo!`,
      status: "2h antes da reunião"
    },
    {
      id: 4,
      badge: "Passo 4",
      name: "4. Acompanhamento do Processo",
      sender: "bot",
      clientMsg: "Doutores, alguma novidade do processo esta semana?",
      botMsg: `Olá! Tudo bem com você? Aqui é do escritório Leonardo Militão Advogados.\n\nEstamos monitorando os prazos diariamente. O caso aguarda manifestação do juiz/relator dentro do prazo regulamentar. Está tudo correndo rigorosamente sob controle. Havendo qualquer novidade oficial, você será avisado(a) imediatamente!`,
      status: "Comunicação proativa periódica"
    },
    {
      id: 5,
      badge: "Passo 5",
      name: "5. Atualização de Etapa",
      sender: "bot",
      clientMsg: null,
      botMsg: `Temos uma novidade no seu processo! 📋\n\nHouve uma nova movimentação formal no sistema e acabamos de protocolar [Petição/Recurso Estratégico] sustentando com firmeza seus direitos. Preparamos uma explicação em áudio e texto simples para que você entenda exatamente o impacto prático dessa fase.`,
      status: "A cada despacho ou recurso"
    },
    {
      id: 6,
      badge: "Passo 6",
      name: "6. Conclusão / Entrega de Resultado",
      sender: "bot",
      clientMsg: null,
      botMsg: `É com imensa alegria e sensação de dever cumprido que informamos: o seu direito foi formalmente reconhecido e conquistamos a decisão favorável que buscávamos! 🎉\n\nFoi uma caminhada firme contra o Poder Público, mas a justiça prevaleceu. Vamos coordenar a execução e liberação dos seus valores/direitos. Parabéns!`,
      status: "Sentença / Decisão favorável"
    },
    {
      id: 7,
      badge: "Passo 7",
      name: "7. Convite para Avaliação",
      sender: "bot",
      clientMsg: "Muito obrigado por tudo, Dr. Leonardo e Dra. Juliana!",
      botMsg: `Sua tranquilidade e justiça sempre foram nossa prioridade. Ficamos honrados em defender sua causa!\n\nPoderia nos ajudar dedicando 1 minuto para contar como foi o atendimento do Dr. Leonardo e da Dra. Juliana no Google? O seu relato ajuda outras pessoas que também estão sofrendo injustiças a encontrarem apoio seguro: [Link da Avaliação no Google]`,
      status: "Pós-resultado"
    },
    {
      id: 8,
      badge: "Passo 8",
      name: "8. Agradecimento e Indicação",
      sender: "bot",
      clientMsg: null,
      botMsg: `Muito obrigado por toda a confiança depositada na Leonardo Militão Advogados Associados ao longo dessa jornada. Nossas portas estarão sempre abertas para você, seus amigos e sua família. Conte conosco sempre que precisar de uma defesa justa, ética e corajosa!`,
      status: "Vínculo contínuo"
    }
  ];

  const current = steps[activeStep];

  return (
    <section id="simulador" className="py-24 bg-[#F5EFE6] border-y border-[#E5DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#E1EFE7] border border-[#BBDCCB] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2D6A4F]">
            <Bot className="w-3.5 h-3.5" />
            <span>Simulador Interativo de Atendimento</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A231F]">
            Como Funciona Nosso Atendimento
          </h2>
          <p className="text-[#5C4D44] text-sm sm:text-base leading-relaxed">
            Veja na prática como você é acolhido e informado em cada etapa do seu processo, com total serenidade, sem silêncios nem surpresas.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Step Selector List with Harmonic Hover */}
          <div className="lg:col-span-5 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#736359] mb-3">
              Fluxo Completo de 8 Etapas:
            </p>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {steps.map((st, i) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs font-medium transition-all duration-300 ease-out flex items-center justify-between group transform hover:-translate-y-1 ${
                    activeStep === i
                      ? 'bg-white border-[#B86F3B] text-[#2A231F] shadow-md shadow-[#8C4E24]/10 ring-1 ring-[#B86F3B]/30'
                      : 'bg-white/70 border-[#E5DDD0] text-[#6E5F57] hover:text-[#2A231F] hover:bg-white hover:border-[#D1C3B2] hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0 ${
                        activeStep === i
                          ? 'bg-[#B86F3B] text-white shadow-xs'
                          : 'bg-[#EFE7DC] text-[#736359] group-hover:bg-[#E5D7C5] group-hover:text-[#2A231F]'
                      }`}
                    >
                      {st.id}
                    </span>
                    <div>
                      <p className="font-semibold text-[#2A231F] text-xs">{st.name}</p>
                      <p className="text-[11px] text-[#8C7A70]">{st.status}</p>
                    </div>
                  </div>
                  <Play className={`w-3.5 h-3.5 transition-all duration-200 ${activeStep === i ? 'text-[#B86F3B] opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp Interactive Screen with Warm Frame */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-[#DFD5C7] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
            {/* Phone Top Header (WhatsApp Classic Calm Green) */}
            <div className="bg-[#1F543C] px-5 py-4 flex items-center justify-between text-white shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0 font-bold text-sm">
                  LM
                </div>
                <div>
                  <h4 className="text-sm font-bold flex items-center space-x-2">
                    <span>Leonardo Militão Advogados</span>
                    <CheckCheck className="w-4 h-4 text-[#7BE495]" />
                  </h4>
                  <p className="text-[11px] text-emerald-200 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#7BE495] animate-pulse"></span>
                    <span>Online agora &bull; Acolhimento Humanizado</span>
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-mono text-emerald-100 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                {current.badge} de 8
              </span>
            </div>

            {/* Chat Body (Beige WhatsApp Wallpaper tint) */}
            <div className="p-6 space-y-4 bg-[#EFEAE2] min-h-[340px] flex flex-col justify-end">
              {/* Optional Client Bubble */}
              {current.clientMsg && (
                <div className="flex justify-end">
                  <div className="max-w-[85%] sm:max-w-[75%] bg-[#D9FDD3] text-[#111B21] text-xs sm:text-sm rounded-2xl rounded-tr-xs p-3.5 shadow-xs space-y-1 border border-[#BDEBB5]">
                    <p>{current.clientMsg}</p>
                    <div className="flex items-center justify-end space-x-1 text-[10px] text-[#53BDEB]">
                      <span className="text-slate-500">14:02</span>
                      <CheckCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              )}

              {/* Bot / Lawyer Response Bubble */}
              <div className="flex justify-start">
                <div className="max-w-[90%] sm:max-w-[85%] bg-white border border-[#DDD5C8] text-[#222E35] text-xs sm:text-sm rounded-2xl rounded-tl-xs p-4 shadow-sm space-y-2.5">
                  <div className="flex items-center space-x-2 text-[11px] text-[#8C4E24] font-semibold border-b border-[#F0EBE1] pb-1.5">
                    <Bot className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <span>Script Automatizado & Acompanhamento Humanizado</span>
                  </div>
                  <p className="whitespace-pre-line leading-relaxed text-[#333E44]">
                    {current.botMsg}
                  </p>
                  <div className="flex items-center justify-end space-x-1 text-[10px] text-slate-400 pt-1">
                    <span>14:03</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bottom Bar */}
            <div className="p-4 bg-[#FAF7F2] border-t border-[#E8E0D2] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#6B5A51] text-center sm:text-left">
                Gatilho: <strong className="text-[#2A231F]">{current.status}</strong>
              </span>

              {/* Button: "Testar Agora" -> opens WhatsApp real */}
              <a
                href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(`Olá! Testei o simulador do site no Passo ${current.id} (${current.name}) e gostaria de conversar com o escritório.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#2D6A4F] hover:bg-[#245640] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-[#2D6A4F]/20 hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                <span>Testar no WhatsApp Real</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
