// Datas das metas (mês/dia/ano)
const metasDatas = {
    1: { nome: "ENEM 2025", data: new Date(2025, 10, 10), status: "⏳ Em andamento" },      // 10/11/2025
    2: { nome: "Primeiro Emprego", data: new Date(2026, 5, 30), status: "⏳ Em andamento" }, // 30/06/2026
    3: { nome: "Curso Profissionalizante", data: new Date(2026, 2, 15), status: "⏳ Em andamento" }, // 15/03/2026
    4: { nome: "Certificado de Inglês", data: new Date(2026, 11, 20), status: "⏳ Em andamento" }, // 20/12/2026
    5: { nome: "Habilitação (CNH)", data: new Date(2027, 11, 31), status: "⏳ Em andamento" }, // 31/12/2027
    6: { nome: "Entrar na Faculdade", data: new Date(2027, 0, 31), status: "⏳ Em andamento" } // 31/01/2027
};

// Função para calcular tempo restante
function calcularTempoRestante(dataAlvo) {
    const agora = new Date();
    const diferenca = dataAlvo - agora;
    
    if (diferenca <= 0) {
        return { dias: 0, horas: 0, minutos: 0, segundos: 0, expirado: true };
    }
    
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    
    return { dias, horas, minutos, segundos, expirado: false };
}

// Função para atualizar um countdown específico
function atualizarCountdown(metaId) {
    const meta = metasDatas[metaId];
    const tempo = calcularTempoRestante(meta.data);
    
    // Atualizar elementos HTML
    document.getElementById(`dias${metaId}`).textContent = tempo.dias.toString().padStart(2, '0');
    document.getElementById(`horas${metaId}`).textContent = tempo.horas.toString().padStart(2, '0');
    document.getElementById(`minutos${metaId}`).textContent = tempo.minutos.toString().padStart(2, '0');
    document.getElementById(`segundos${metaId}`).textContent = tempo.segundos.toString().padStart(2, '0');
    
    const statusElement = document.getElementById(`status${metaId}`);
    
    if (tempo.expirado || (tempo.dias === 0 && tempo.horas === 0 && tempo.minutos === 0 && tempo.segundos === 0)) {
        statusElement.textContent = "✅ PRAZO FINALIZADO!";
        statusElement.classList.add("concluida");
        statusElement.classList.remove("expirada");
        
        // Verificar se é data atual ou passou
        if (new Date() > meta.data) {
            statusElement.textContent = "⚠️ PRAZO EXPIROU!";
            statusElement.classList.add("expirada");
            statusElement.classList.remove("concluida");
        }
    } else if (tempo.dias <= 30 && tempo.dias > 0) {
        statusElement.textContent = `🔥 FALTAM ${tempo.dias} DIAS - CORRE!`;
        statusElement.classList.add("urgente");
        statusElement.style.background = "#f59e0b";
        statusElement.style.color = "white";
    } else {
        statusElement.textContent = "⏳ Em andamento";
        statusElement.classList.remove("concluida", "expirada", "urgente");
        statusElement.style.background = "#e5e7eb";
        statusElement.style.color = "#374151";
    }
}

// Função para atualizar todos os countdowns
function atualizarTodosCountdowns() {
    for (let i = 1; i <= 6; i++) {
        atualizarCountdown(i);
    }
}

// Função para resetar todos os countdowns (recarregar datas)
function resetarTodosCountdowns() {
    // Recriar as datas (resetar)
    metasDatas[1].data = new Date(2025, 10, 10);
    metasDatas[2].data = new Date(2026, 5, 30);
    metasDatas[3].data = new Date(2026, 2, 15);
    metasDatas[4].data = new Date(2026, 11, 20);
    metasDatas[5].data = new Date(2027, 11, 31);
    metasDatas[6].data = new Date(2027, 0, 31);
    
    // Resetar estilos dos status
    for (let i = 1; i <= 6; i++) {
        const statusElement = document.getElementById(`status${i}`);
        statusElement.textContent = "⏳ Em andamento";
        statusElement.style.background = "#e5e7eb";
        statusElement.style.color = "#374151";
        statusElement.classList.remove("concluida", "expirada", "urgente");
    }
    
    atualizarTodosCountdowns();
    alert("🔄 Todos os countdowns foram resetados para as datas originais!");
}

// Salvar progresso no localStorage a cada 30 segundos
setInterval(() => {
    const progresso = {};
    for (let i = 1; i <= 6; i++) {
        progresso[i] = metasDatas[i].data.toISOString();
    }
    localStorage.setItem('countdownMetas', JSON.stringify(progresso));
    console.log("💾 Progresso salvo automaticamente!");
}, 30000);

// Carregar progresso salvo ao iniciar
function carregarProgresso() {
    const progressoSalvo = localStorage.getItem('countdownMetas');
    if (progressoSalvo) {
        const progresso = JSON.parse(progressoSalvo);
        for (let i = 1; i <= 6; i++) {
            if (progresso[i]) {
                metasDatas[i].data = new Date(progresso[i]);
            }
        }
        console.log("📀 Progresso carregado com sucesso!");
    }
}

// Event listener para o botão resetar todas
document.getElementById('btnResetarTodas').addEventListener('click', resetarTodosCountdowns);

// Inicializar
carregarProgresso();
atualizarTodosCountdowns();

// Atualizar a cada segundo
setInterval(atualizarTodosCountdowns, 1000);

// Mensagem personalizada no console
console.log("%c🎯 COUNTDOWN DAS METAS - RAFAEL DE OLIVEIRA DE CASTILHO", "color: #f093fb; font-size: 18px; font-weight: bold;");
console.log("%c⏰ O tempo está passando. Foco nas suas metas profissionais!", "color: #667eea; font-size: 14px;");

// Exibir as datas no console
for (let i = 1; i <= 6; i++) {
    console.log(`📌 ${metasDatas[i].nome}: ${metasDatas[i].data.toLocaleDateString('pt-BR')}`);
}