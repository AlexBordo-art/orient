## Design System: Orient Express

### Pattern
- **Name:** Storytelling-Driven + Hero
- **CTA Placement:** Above fold
- **Sections:** Hero > Features > CTA

### Style
- **Name:** Motion-Driven
- **Keywords:** Animation-heavy, microinteractions, smooth transitions, scroll effects, parallax, entrance anim, page transitions
- **Best For:** Portfolio sites, storytelling platforms, interactive experiences, entertainment apps, creative, SaaS
- **Performance:** ⚠ Good | **Accessibility:** ⚠ Prefers-reduced-motion

### Colors
| Role | Hex |
|------|-----|
| Primary | #0EA5E9 |
| Secondary | #38BDF8 |
| CTA | #F97316 |
| Background | #F0F9FF |
| Text | #0C4A6E |

*Notes: Sky blue + adventure orange*

### Typography
- **Heading:** Poppins
- **Body:** Open Sans
- **Mood:** modern, professional, clean, corporate, friendly, approachable
- **Best For:** SaaS, corporate sites, business apps, startups, professional services
- **Google Fonts:** https://fonts.google.com/share?selection.family=Open+Sans:wght@300;400;500;600;700|Poppins:wght@400;500;600;700
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
```

### Key Effects
Scroll anim (Intersection Observer), hover (300-400ms), entrance, parallax (3-5 layers), page transitions

### Avoid (Anti-patterns)
- Generic photos
- Complex booking

### Pre-Delivery Checklist
- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px

