// Acesso temporário como visitante (sem e-mail). Para voltar a exigir
// e-mail autorizado, basta mudar GUEST_ACCESS_ENABLED para false: o botão
// some da tela de login e o middleware deixa de aceitar sessões de visitante.
export const GUEST_ACCESS_ENABLED = true;

// Valor gravado no cookie ginga_session para quem entra como visitante.
export const GUEST_SESSION = "visitante";
