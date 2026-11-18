import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin, Phone, QrCode as QrIcon, Share, UserPlus, X } from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import { cn } from '../lib/cn';
import { EASE } from '../components/ui/motion';
import { Wordmark } from '../components/ui/marks';
import { LinkGlyph, QrCode, WhatsAppGlyph, downloadQrPng } from '../components/founder/FounderKit';
import {
  type Founder,
  type FounderLink,
  founderUrl,
  fullName,
  initials,
  socialLabel,
  vcardPath,
  whatsappHref,
} from '../content/founders';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const track = (founder: Founder, action: string, label?: string) => {
  try {
    window.gtag?.('event', 'founder_link', { founder: founder.slug, action, label });
  } catch {
    // Analytics never blocks a tap.
  }
};

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
};

const isExternal = (href: string) => /^https?:\/\//.test(href);
const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '');

/* ── Small pieces ── */

/** No photo yet: initials in a ringed disc. */
const Avatar: React.FC<{ founder: Founder }> = ({ founder }) => (
  <div className="relative">
    <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-honey/20 blur-3xl" />
    <div className="relative rounded-full bg-gradient-to-b from-honey/90 via-honey/30 to-honey/5 p-[2px]">
      <div className="rounded-full bg-ink p-[5px]">
        <div className="grid h-[112px] w-[112px] place-items-center rounded-full bg-gradient-to-b from-ink-700 to-ink-850 font-serif text-[46px] leading-none text-bone" aria-hidden="true">
          {initials(founder)}
        </div>
      </div>
    </div>
  </div>
);

const RoleLine: React.FC<{ founder: Founder; className?: string }> = ({ founder, className }) => (
  <p className={cn('flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[15px]', className)}>
    {founder.role}
    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current opacity-40" />
    <span className="text-fg">{founder.org}</span>
  </p>
);

/* Progressive blur at the foot of the photo, so the name reads cleanly over it. */
const photoBlur = [
  { blur: 10, mask: 'linear-gradient(to top, #000 22%, transparent 48%)' },
  { blur: 26, mask: 'linear-gradient(to top, #000 8%, transparent 30%)' },
];

/** Full-bleed portrait with the name set over its lower edge. */
const PhotoHero: React.FC<{ founder: Founder; reduce: boolean | null }> = ({ founder, reduce }) => {
  const photo = founder.photo!;
  const img = (extra?: React.CSSProperties, eager = false) => (
    <picture>
      {photo.webp && <source srcSet={photo.webp} type="image/webp" />}
      <img
        src={photo.src}
        alt={eager ? fullName(founder) : ''}
        width={1080}
        height={1380}
        decoding="async"
        {...(eager ? { fetchpriority: 'high' } : {})}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: photo.focus ?? '50% 25%', ...extra }}
      />
    </picture>
  );

  return (
    <section className="relative -mx-5 sm:mx-0 sm:mt-3 sm:overflow-hidden sm:rounded-[32px] sm:ring-1 sm:ring-fg/[0.08]">
      <div className="relative h-[min(80svh,560px)] min-h-[440px] w-full overflow-hidden bg-ink-850">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          {img(undefined, true)}
          {photoBlur.map(({ blur, mask }) => (
            <div key={blur} aria-hidden="true" className="absolute inset-0" style={{ maskImage: mask, WebkitMaskImage: mask }}>
              {img({ filter: `blur(${blur}px)`, transform: 'scale(1.06)' })}
            </div>
          ))}
        </motion.div>
        {/* Shade: top for the buttons, bottom melting into the page */}
        {/* Phones: start from the browser's dark status bar and melt into the photo, so there is no seam */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(to_bottom,#0B0A08_0%,rgba(11,10,8,0.82)_14%,rgba(11,10,8,0.45)_42%,rgba(11,10,8,0.12)_72%,transparent_100%)] sm:hidden" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-32 bg-gradient-to-b from-ink/70 to-transparent sm:block" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink via-ink/75 to-transparent" />
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-7 text-center"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 1, ease: EASE }}
      >
        <h1 className="font-serif text-[clamp(3.1rem,14.5vw,4.1rem)] leading-[0.92] tracking-[-0.02em] text-bone [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]">
          {fullName(founder)}
        </h1>
        <RoleLine founder={founder} className="mt-3.5 text-fg/75" />
      </motion.div>
    </section>
  );
};

const IconButton: React.FC<{ label: string; onClick: () => void; children: React.ReactNode }> = ({ label, onClick, children }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={onClick}
    className="grid h-11 w-11 place-items-center rounded-full border border-fg/10 bg-fg/[0.04] text-fg/80 backdrop-blur transition hover:border-fg/25 hover:text-fg active:scale-95"
  >
    {children}
  </button>
);

const Action: React.FC<{ href: string; label: string; icon: React.ReactNode; onClick?: () => void; external?: boolean }> = ({ href, label, icon, onClick, external }) => (
  <a
    href={href}
    onClick={onClick}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className="group flex flex-col items-center justify-center gap-2 rounded-[20px] border border-fg/[0.08] bg-fg/[0.035] py-4 text-[12.5px] font-medium text-fg/70 transition hover:border-fg/20 hover:bg-fg/[0.06] hover:text-fg active:scale-[0.96]"
  >
    <span className="text-fg transition group-hover:text-honey">{icon}</span>
    {label}
  </a>
);

const LinkRow: React.FC<{ link: FounderLink; onOpen: () => void }> = ({ link, onOpen }) => (
  <a
    href={link.href}
    onClick={onOpen}
    {...(isExternal(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className="group flex min-h-[68px] items-center gap-4 rounded-[20px] border border-fg/[0.08] bg-[#14120F] p-3 pr-4 transition duration-300 hover:border-fg/20 hover:bg-[#1A1713] active:scale-[0.985]"
  >
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-fg/[0.05] text-fg/85 ring-1 ring-inset ring-fg/[0.06]">
      <LinkGlyph icon={link.icon} />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block truncate text-[15.5px] font-medium tracking-[-0.01em] text-fg">{link.label}</span>
      {link.sub && <span className="mt-0.5 block truncate text-[13px] text-fg/50">{link.sub}</span>}
    </span>
    <ArrowUpRight className="h-[18px] w-[18px] shrink-0 text-fg/30 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-honey" />
  </a>
);

const Featured: React.FC<{ link: FounderLink; onOpen: () => void }> = ({ link, onOpen }) => (
  <a
    href={link.href}
    onClick={onOpen}
    {...(isExternal(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className="group relative flex items-center gap-4 overflow-hidden rounded-[24px] border border-honey/25 bg-gradient-to-br from-honey/[0.16] via-honey/[0.06] to-transparent p-4 transition duration-300 hover:border-honey/50 active:scale-[0.985]"
  >
    <span aria-hidden="true" className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-honey/20 blur-2xl transition duration-500 group-hover:bg-honey/30" />
    <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-honey text-ink">
      <LinkGlyph icon={link.icon} className="h-[22px] w-[22px]" />
    </span>
    <span className="relative min-w-0 flex-1">
      <span className="block text-[16.5px] font-medium tracking-[-0.015em] text-fg">{link.label}</span>
      {link.sub && <span className="mt-0.5 block text-[13px] text-fg/55">{link.sub}</span>}
    </span>
    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-fg/[0.08] text-fg transition duration-300 group-hover:bg-honey group-hover:text-ink">
      <ArrowUpRight className="h-[18px] w-[18px]" />
    </span>
  </a>
);

/* ── QR sheet: a bottom sheet on phones, a dialog on larger screens ── */

const QrSheet: React.FC<{
  founder: Founder;
  open: boolean;
  onClose: () => void;
  onShare: () => void;
  onCopyLink: () => void;
}> = ({ founder, open, onClose, onShare, onCopyLink }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const url = founderUrl(founder);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <div className="pointer-events-none fixed inset-0 z-[71] flex items-end justify-center sm:items-center sm:p-6">
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="qr-title"
              className="pointer-events-auto relative w-full rounded-t-[30px] border-t border-fg/10 bg-[#13110E] px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.8)] sm:max-w-[400px] sm:rounded-[30px] sm:border sm:pb-6 sm:pt-6"
              initial={reduce ? { opacity: 0 } : { y: '100%' }}
              animate={reduce ? { opacity: 1 } : { y: 0 }}
              exit={reduce ? { opacity: 0 } : { y: '100%' }}
              transition={{ duration: 0.5, ease: EASE }}
              drag={reduce ? false : 'y'}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => (info.offset.y > 110 || info.velocity.y > 600) && onClose()}
            >
              <div aria-hidden="true" className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-fg/15 sm:hidden" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-fg/[0.06] text-fg/70 transition hover:text-fg sm:right-5 sm:top-5"
              >
                <X className="h-[18px] w-[18px]" />
              </button>

              <div className="text-center">
                <p className="t-label text-fg/40">Scan to connect</p>
                <h2 id="qr-title" className="mt-3 font-serif text-[34px] leading-none">
                  {fullName(founder)}
                </h2>
              </div>

              <div className="mx-auto mt-6 w-full max-w-[290px] rounded-[26px] bg-bone p-4 shadow-[0_20px_60px_-20px_rgba(242,210,122,0.35)]">
                <QrCode ref={svgRef} value={url} className="block h-auto w-full" />
              </div>
              <p className="mt-4 text-center font-mono text-[12.5px] text-fg/45">{prettyUrl(url)}</p>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {[
                  { label: 'Share', icon: <Share className="h-[18px] w-[18px]" />, onClick: onShare },
                  { label: 'Copy link', icon: <Copy className="h-[18px] w-[18px]" />, onClick: onCopyLink },
                  {
                    label: 'Save image',
                    icon: <Download className="h-[18px] w-[18px]" />,
                    onClick: () => {
                      track(founder, 'qr_download');
                      if (svgRef.current) downloadQrPng(svgRef.current, `${founder.slug}-nostavia-qr.png`);
                    },
                  },
                ].map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={b.onClick}
                    className="flex flex-col items-center gap-2 rounded-[18px] border border-fg/[0.08] bg-fg/[0.04] py-3.5 text-[12.5px] font-medium text-fg/75 transition hover:border-fg/20 hover:text-fg active:scale-[0.96]"
                  >
                    {b.icon}
                    {b.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ── Page ── */

const FounderPage: React.FC<{ founder: Founder }> = ({ founder: f }) => {
  const name = fullName(f);
  const url = founderUrl(f);
  const reduce = useReducedMotion();
  const [qrOpen, setQrOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number>();

  useSeo({
    title: `${name} · ${f.role}, ${f.org}`,
    description: `${f.bio} Save ${f.firstName}’s contact, or reach ${f.firstName} by phone, WhatsApp, email or LinkedIn.`,
    path: `/${f.slug}`,
    type: 'website',
  });

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1900);
  }, []);

  const copy = async (key: string, text: string, msg: string) => {
    if (await copyText(text)) {
      notify(msg);
      track(f, 'copy', key);
    }
  };

  const copyLink = () => copy('link', url, 'Link copied');

  const share = async () => {
    track(f, 'share');
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: `${name}, ${f.role} at ${f.org}`, url });
        return;
      } catch (e) {
        if ((e as DOMException)?.name === 'AbortError') return;
      }
    }
    copyLink();
  };

  const openQr = () => {
    track(f, 'qr_open');
    setQrOpen(true);
  };
  const closeQr = useCallback(() => setQrOpen(false), []);

  const wa = f.whatsapp ? whatsappHref(f) : undefined;
  const actions = [
    f.phone && { label: 'Call', href: `tel:${f.phone.e164}`, icon: <Phone className="h-[20px] w-[20px]" strokeWidth={1.7} /> },
    wa && { label: 'WhatsApp', href: wa, icon: <WhatsAppGlyph />, external: true },
    f.email && { label: 'Email', href: `mailto:${f.email}`, icon: <Mail className="h-[20px] w-[20px]" strokeWidth={1.7} /> },
  ].filter(Boolean) as { label: string; href: string; icon: React.ReactNode; external?: boolean }[];

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };
  const item: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };

  return (
    <div data-theme="ink" className="relative min-h-[100svh] overflow-x-clip text-fg">
      {/* Ambient light behind the profile */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[620px] overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[760px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(242,210,122,0.16),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(242,237,227,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top,#000_10%,transparent_65%)]" />
      </div>

      <header className="absolute inset-x-0 top-0 z-30 mx-auto flex max-w-[480px] items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-7">
        <a href="/" aria-label="Nostavia home" className="py-2">
          <Wordmark className="h-[19px]" />
        </a>
        <div className="flex gap-2">
          <IconButton label="Show QR code" onClick={openQr}>
            <QrIcon className="h-[18px] w-[18px]" />
          </IconButton>
          <IconButton label="Share this page" onClick={share}>
            <Share className="h-[18px] w-[18px]" />
          </IconButton>
        </div>
      </header>

      <motion.main
        id="main"
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-[480px] px-5 pb-[calc(2.5rem+env(safe-area-inset-bottom))]"
      >
        {/* Profile */}
        {f.photo ? (
          <>
            <PhotoHero founder={f} reduce={reduce} />
            <motion.section variants={item} className="flex flex-col items-center pt-2 text-center">
              <p className="t-label inline-flex items-center gap-1.5 text-[10.5px] text-fg/40">
                <MapPin className="h-3 w-3" />
                {f.city}, {f.country}
              </p>
              {f.bio && <p className="mt-4 max-w-[34ch] text-pretty text-[15.5px] leading-relaxed text-fg/70">{f.bio}</p>}
            </motion.section>
          </>
        ) : (
          <motion.section variants={item} className="flex flex-col items-center pt-[calc(env(safe-area-inset-top)+5.5rem)] text-center">
            <Avatar founder={f} />
            <h1 className="mt-7 font-serif text-[clamp(2.75rem,12vw,3.5rem)] leading-[0.95] tracking-[-0.015em]">{name}</h1>
            <RoleLine founder={f} className="mt-3 text-fg/60" />
            <p className="t-label mt-4 inline-flex items-center gap-1.5 text-[10.5px] text-fg/40">
              <MapPin className="h-3 w-3" />
              {f.city}, {f.country}
            </p>
            {f.bio && <p className="mt-6 max-w-[34ch] text-pretty text-[15.5px] leading-relaxed text-fg/70">{f.bio}</p>}
          </motion.section>
        )}

        {/* Save contact + quick actions */}
        <motion.section variants={item} className="mt-8">
          <a
            href={vcardPath(f)}
            onClick={() => track(f, 'save_contact')}
            className="group flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-honey text-[16px] font-medium tracking-[-0.01em] text-ink shadow-[0_14px_40px_-14px_rgba(242,210,122,0.6)] transition duration-300 hover:bg-honey-300 active:scale-[0.98]"
          >
            <UserPlus className="h-[19px] w-[19px]" strokeWidth={1.9} />
            Save contact
          </a>
          {actions.length > 0 && (
            <div className="mt-3 grid gap-2.5" style={{ gridTemplateColumns: `repeat(${actions.length}, minmax(0, 1fr))` }}>
              {actions.map((a) => (
                <Action key={a.label} {...a} onClick={() => track(f, 'action', a.label)} />
              ))}
            </div>
          )}
        </motion.section>

        {/* Socials */}
        {f.socials.length > 0 && (
          <motion.ul variants={item} className="mt-7 flex flex-wrap justify-center gap-3" aria-label="Social profiles">
            {f.socials.map((s) => (
              <li key={s.kind}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${f.firstName} on ${socialLabel[s.kind]}`}
                  title={socialLabel[s.kind]}
                  onClick={() => track(f, 'social', s.kind)}
                  className="grid h-12 w-12 place-items-center rounded-full border border-fg/10 text-fg/75 transition duration-300 hover:-translate-y-0.5 hover:border-honey/50 hover:text-honey active:scale-95"
                >
                  <LinkGlyph icon={s.kind} />
                </a>
              </li>
            ))}
          </motion.ul>
        )}

        {/* Links */}
        <motion.ul variants={item} className="mt-9 flex flex-col gap-2.5">
          {f.featured && (
            <li>
              <Featured link={f.featured} onOpen={() => track(f, 'link', f.featured!.label)} />
            </li>
          )}
          {f.links.map((l) => (
            <li key={l.label}>
              <LinkRow link={l} onOpen={() => track(f, 'link', l.label)} />
            </li>
          ))}
        </motion.ul>

        <motion.footer variants={item} className="mt-14 flex justify-center">
          <a href="/" className="opacity-50 transition hover:opacity-100" aria-label="Nostavia home">
            <Wordmark className="h-[14px]" />
          </a>
        </motion.footer>
      </motion.main>

      {/* Large screens: a QR to carry the page over to a phone */}
      <motion.aside
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
        className="fixed bottom-8 right-8 z-20 hidden w-[208px] rounded-[26px] border border-fg/10 bg-[#13110E]/90 p-4 backdrop-blur xl:block"
      >
        <button type="button" onClick={openQr} className="block w-full rounded-[18px] bg-bone p-2.5" aria-label="Show a larger QR code">
          <QrCode value={url} className="block h-auto w-full" />
        </button>
        <p className="mt-3 text-center text-[12.5px] leading-snug text-fg/55">Scan to open on your phone</p>
      </motion.aside>

      <QrSheet founder={f} open={qrOpen} onClose={closeQr} onShare={share} onCopyLink={copyLink} />

      {/* Toast */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-[85] flex justify-center px-5">
        <AnimatePresence>
          {toast && (
            <motion.p
              key={toast}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex items-center gap-2 rounded-full bg-bone px-4 py-2.5 text-[14px] font-medium text-ink shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]"
            >
              <Check className="h-4 w-4" strokeWidth={2.4} />
              {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="grain" aria-hidden="true" />
    </div>
  );
};

export default FounderPage;
