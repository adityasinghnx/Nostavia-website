import React, { forwardRef, useMemo } from 'react';
import qrcode from 'qrcode-generator';
import { CalendarDays, Github, Globe, Instagram, Layers, Link2, Linkedin, Mail, Sparkles, Youtube } from 'lucide-react';
import type { LinkIcon } from '../../content/founders';
import { cn } from '../../lib/cn';

/* ── Icons ── */

const XLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export const LinkGlyph: React.FC<{ icon: LinkIcon; className?: string }> = ({ icon, className }) => {
  const cls = cn('h-[20px] w-[20px]', className);
  switch (icon) {
    case 'linkedin':
      return <Linkedin className={cls} strokeWidth={1.7} />;
    case 'instagram':
      return <Instagram className={cls} strokeWidth={1.7} />;
    case 'x':
      return <XLogo className={cn(cls, 'scale-[0.82]')} />;
    case 'github':
      return <Github className={cls} strokeWidth={1.7} />;
    case 'youtube':
      return <Youtube className={cls} strokeWidth={1.7} />;
    case 'website':
      return <Globe className={cls} strokeWidth={1.7} />;
    case 'calendar':
      return <CalendarDays className={cls} strokeWidth={1.7} />;
    case 'mail':
      return <Mail className={cls} strokeWidth={1.7} />;
    case 'nostavia':
      return <Globe className={cls} strokeWidth={1.7} />;
    case 'human-os':
      return <Layers className={cls} strokeWidth={1.7} />;
    case 'studio':
      return <Sparkles className={cls} strokeWidth={1.7} />;
    default:
      return <Link2 className={cls} strokeWidth={1.7} />;
  }
};

/** WhatsApp glyph in the same line weight as the other icons. */
export const WhatsAppGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('h-[20px] w-[20px]', className)} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.4z" />
    <path d="M9.1 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.1.7l-.5.6c-.1.1-.1.3 0 .5.5.9 1.2 1.6 2.1 2.1.2.1.4.1.5 0l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.6.5-3-.1-1.6-.7-3-2.1-3.7-3.7-.6-1.4-.4-2.4-.1-3.2z" fill="currentColor" stroke="none" />
  </svg>
);

/* ── QR code: rounded modules and soft finder eyes. Always ink on bone:
 *    many phone scanners cannot read light-on-dark codes. ── */

interface QrProps {
  value: string;
  className?: string;
  /** Quiet zone in modules. */
  margin?: number;
}

export const QrCode = forwardRef<SVGSVGElement, QrProps>(({ value, className, margin = 1 }, ref) => {
  const { n, dots } = useMemo(() => {
    const qr = qrcode(0, 'M');
    qr.addData(value);
    qr.make();
    const n = qr.getModuleCount();
    const eye = (r: number, c: number) => (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
    const dots: [number, number][] = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c) && !eye(r, c)) dots.push([r, c]);
    return { n, dots };
  }, [value]);

  const size = n + margin * 2;
  const eyes = [
    [0, 0],
    [0, n - 7],
    [n - 7, 0],
  ];

  return (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${size} ${size}`} className={className} role="img" aria-label={`QR code for ${value}`} shapeRendering="geometricPrecision">
      <rect width={size} height={size} fill="#F2EDE3" />
      <g fill="#0B0A08">
        {dots.map(([r, c]) => (
          <rect key={`${r}-${c}`} x={c + margin + 0.07} y={r + margin + 0.07} width={0.86} height={0.86} rx={0.3} />
        ))}
      </g>
      {eyes.map(([r, c]) => (
        <g key={`${r}-${c}`} transform={`translate(${c + margin} ${r + margin})`}>
          <rect x={0.5} y={0.5} width={6} height={6} rx={1.9} fill="none" stroke="#0B0A08" strokeWidth={1} />
          <rect x={2} y={2} width={3} height={3} rx={0.95} fill="#0B0A08" />
        </g>
      ))}
    </svg>
  );
});
QrCode.displayName = 'QrCode';

/** Saves a QR svg as a print-ready PNG on a bone card. */
export const downloadQrPng = async (svg: SVGSVGElement, fileName: string) => {
  const xml = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
  await img.decode();
  const px = 1200;
  const pad = 96;
  const canvas = document.createElement('canvas');
  canvas.width = px;
  canvas.height = px;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#F2EDE3';
  ctx.fillRect(0, 0, px, px);
  ctx.drawImage(img, pad, pad, px - pad * 2, px - pad * 2);
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
};
