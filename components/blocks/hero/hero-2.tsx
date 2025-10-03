// components/blocks/hero/hero-2.tsx
import { Button } from '@/components/ui/button1';
import Link from 'next/link';
import { stegaClean } from 'next-sanity';
import PortableTextRenderer from '@/components/portable-text-renderer';
import { FadeIn } from '@/components/ui/fade.in';
import { PAGE_QUERYResult } from '@/sanity.types';
import { getHeroTitleClasses } from '@/lib/styles/hero';
import { cn } from '@/lib/utils';

type Hero2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'hero-2' }
>;

export default function Hero2({ tagLine, title, body, links, titleStyle }: Hero2Props) {
  const titleClasses = getHeroTitleClasses(titleStyle, { fontSize: 'md' });

  return (
    <div className="container dark:bg-background py-20 lg:pt-40 text-center">
      {tagLine && (
        <FadeIn as="h1" delay={120} className="leading-[0] font-sans">
          <span className="text-base font-semibold">{tagLine}</span>
        </FadeIn>
      )}
      {title && (
        <FadeIn
          as="h2"
          delay={220}
          className={cn('mt-6 leading-[1.1]', titleClasses)}
        >
          {title}
        </FadeIn>
      )}
      {body && (
        <FadeIn as="div" delay={320} className="mx-auto mt-6 max-w-2xl text-lg">
          <PortableTextRenderer value={body} />
        </FadeIn>
      )}
      {links && links.length > 0 && (
        <FadeIn
          as="div"
          delay={420}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          {links.map((link, index) => {
            const linkKey = link._key ?? `${link.href ?? 'cta'}-${index}`;
            const href = link.href ? stegaClean(link.href) : '#';
            const label = stegaClean(link.title) || 'Learn more';
            const target = link.target ? '_blank' : undefined;

            return (
              <Button
                key={linkKey}
                variant={stegaClean(link?.buttonVariant)}
                asChild
              >
                <Link
                  href={href}
                  target={target}
                  rel={target ? 'noopener noreferrer' : undefined}
                >
                  {label}
                </Link>
              </Button>
            );
          })}
        </FadeIn>
      )}
    </div>
  );
}
