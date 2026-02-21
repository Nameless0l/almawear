const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+33759523398";

export function getWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encoded}`;
}

export function getProductOrderLink(
  productName: string,
  size?: string,
  color?: string,
): string {
  const message = `Bonjour Alma Wear ! 👋\n\nJe suis intéressé(e) par :\n*${productName}*${size ? `\nTaille : ${size}` : ""}${color ? `\nCouleur : ${color}` : ""}\n\nComment faire pour l'avoir ? Pourriez-vous me livrer / expédier ? Merci 🌸`;
  return getWhatsAppLink(message);
}

export function getGeneralContactLink(): string {
  const message = `Bonjour Alma Wear ! 👋\n\nJe souhaite en savoir plus sur vos créations. Merci !`;
  return getWhatsAppLink(message);
}
