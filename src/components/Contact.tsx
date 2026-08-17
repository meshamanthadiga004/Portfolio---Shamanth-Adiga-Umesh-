import { profile } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";
import Socials from "./Socials";

export default function Contact() {
  return (
    <Section id="contact" num="05" label="Contact" title="Let's talk, connect with me">
      <Reveal>
        <p className="lead mx-auto text-center text-[var(--muted)]">
          {profile.contactNote}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-12 text-center">
          <p className="eyebrow">Best way to reach me</p>
          <a
            href={`mailto:${profile.email}`}
            className="grad-text mt-4 inline-block break-all text-2xl italic leading-tight transition-opacity hover:opacity-75 sm:text-4xl"
          >
            {profile.email}
          </a>
        </div>
      </Reveal>

      {profile.phone ? (
        <Reveal delay={120}>
          <p className="mx-auto mt-8 text-center text-[var(--muted)]">
            Prefer to call?{" "}
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="whitespace-nowrap text-[var(--ink)] underline decoration-[var(--hair)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
            >
              {profile.phone}
            </a>
            . Email reaches me fastest and keeps everything in one thread — I&rsquo;ll
            always reply there first.
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={160}>
        <Socials className="mt-10 justify-center" includeEmail includePhone />
      </Reveal>

      {/* ------------------------------------------------------------ portrait
          Drop a square photo at public/portrait.jpg and set `portrait` in
          profile.ts. Until then this renders a labelled placeholder so the
          space is reserved and you can see how it sits. */}
      <Reveal delay={200}>
        <figure className="mx-auto mt-20 max-w-xs text-center">
          {profile.portrait ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={profile.portrait}
              alt={profile.name}
              width={320}
              height={320}
              className="aspect-square w-full rounded-2xl border border-[var(--hair)] object-cover"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-dashed border-[var(--hair)] bg-[var(--surface)]/40">
              <span className="meta px-6">
                Your portrait goes here — add public/portrait.jpg
              </span>
            </div>
          )}
          <figcaption className="meta mt-4">{profile.name}</figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
