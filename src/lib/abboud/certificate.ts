/** «معلّم صغير» certificate drawn with the plain 2D canvas API (no libraries), for saving as a PNG. */
export type CertificateInfo = { name: string; stars: number; date: string };
export const CERTIFICATE_SIZE = { width: 1200, height: 850 };
export const CERTIFICATE_TITLE = 'شهادة معلّم صغير';
export const CERTIFICATE_REASON = 'تقديراً لشرح الدروس الخمسة عشر لبدر وريم في فصل «عبود المعلّم»';
export const CERTIFICATE_NOTE = 'شهادة تشجيعية من النشاط، محفوظة على هذا الجهاز، وليست من شهادات الأكاديمية الرسمية';
type Ctx = Pick<CanvasRenderingContext2D, 'fillRect' | 'strokeRect' | 'fillText' | 'fillStyle' | 'strokeStyle' | 'lineWidth' | 'font' | 'textAlign' | 'direction'>;
export function drawCertificate(ctx: Ctx, info: CertificateInfo, { width, height } = CERTIFICATE_SIZE) {
  const font = (size: number, bold = false) => `${bold ? 'bold ' : ''}${size}px "Noto Kufi Arabic", Tahoma, system-ui, sans-serif`;
  const line = (text: string, y: number, size: number, color: string, bold = false) => { ctx.font = font(size, bold); ctx.fillStyle = color; ctx.fillText(text, width / 2, y, width - 160); };
  ctx.fillStyle = '#002147'; ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = '#C49E3A'; ctx.lineWidth = 16; ctx.strokeRect(24, 24, width - 48, height - 48);
  ctx.lineWidth = 3; ctx.strokeRect(56, 56, width - 112, height - 112);
  ctx.textAlign = 'center'; ctx.direction = 'rtl';
  line(`🎓 ${CERTIFICATE_TITLE}`, 190, 72, '#E6C36A', true);
  line('تُمنح هذه الشهادة إلى', 290, 36, '#ffffff');
  line(info.name, 410, 88, '#E6C36A', true);
  line(CERTIFICATE_REASON, 500, 32, '#ffffff');
  line(`⭐ ${info.stars} نجمة معلّم`, 575, 40, '#E6C36A', true);
  line(info.date, 680, 28, '#cbd5e1');
  line(CERTIFICATE_NOTE, 735, 22, '#cbd5e1');
}
