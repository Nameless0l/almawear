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
  const message = `Bonjour Alma Wear,\n\nJe suis intéressé(e) par le modèle ${productName}.${color ? `\nCouleur : ${color}` : ""}${size ? `\nTaille : ${size}` : ""}\n\nJe souhaite procéder à la commande.\n\nMerci.`;
  return getWhatsAppLink(message);
}

export function getGeneralContactLink(): string {
  const message = `Bonjour Alma Wear,\n\nJe souhaite en savoir plus sur vos créations. Merci.`;
  return getWhatsAppLink(message);
}
