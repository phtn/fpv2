# Changelog

All notable changes to `fpv2` will be recorded here.

## [Unreleased]

- Styled the hero eyebrow as a translucent chip and enlarged/centered the mobile orbit around the hero.

- Made the mobile header a single row with a logo-only brand and smaller navigation labels.

- Refined mobile navigation, hero typography, CTA sizing, and stacked tournament details; removed fixed-height clipping and improved the background crop and touch targets.

- Tightened hero/detail entrance timing, reduced the label/value stagger to 40ms and travel to 6px, and removed compounded panel/text fades.

- Staggered each tournament detail label and value separately with a fade-up entrance.

- Staggered the date, venue, and tee time entrances by 140ms after the hero finishes entering.

- Delayed the tournament details entrance until the hero title and CTA animations finish, using shared timing variables and reduced-motion support.

- Made light the default theme, consolidated duplicate reveal/reduced-motion CSS, and added staggered hero text entrances keyed to typed tournament data, with a pending-data state.

- Connected theme changes directly to a typed browser view transition with synchronous state updates, circular reveal cleanup, and reduced-motion fallback.

- Fixed the header theme toggle by invoking the reveal handler directly and forwarding the click event through Runner.

- Replaced the hero's demo controls with a responsive tournament details row showing the date, venue, and pending tee time.

- Restored pointer interaction for button-based hero CTAs, including Runner.

- Animated the Runner stroke width between 8px at rest and 48px on hover or keyboard focus.

- Fixed the Runner SVG trace with a visible stroke and a hover/focus drawing transition, respecting reduced-motion preferences.

- Restyled the tournament hero with a centered, oversized two-line title, muted introductory text, and a pill CTA labeled “Register now”.
