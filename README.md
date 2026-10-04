# ShieldGuard Pest Control Dubai

Professionalized file structure for the existing ShieldGuard Pest Control Dubai website.

## Important
The original visual design, Tailwind classes, content, sections, forms, calculator logic, modal, navigation, colors and typography have been preserved.

## Structure

- `index.html` — Main page shell
- `components/header.html` — Top bar + main header + mobile navigation
- `components/footer.html` — Footer
- `components/modal.html` — Global notification modal
- `sections/hero.html` — Hero / quick booking
- `sections/calculator.html` — Interactive cost estimator
- `sections/services.html` — Services
- `sections/why-us.html` — Why choose us / emergency support
- `sections/areas.html` — Dubai service areas
- `sections/booking.html` — Main booking form
- `sections/reviews.html` — Testimonials
- `assets/css/style.css` — Original custom CSS
- `assets/js/main.js` — Original JavaScript
- `assets/images/` — Reserved for future images

## Local development

Because the site loads HTML components with `fetch()`, open it through a local web server rather than directly with `file://`.

VS Code:
1. Open the `ShieldGuard-Pest-Control` folder.
2. Install/use Live Server.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

Hostinger:
Upload the complete folder contents to `public_html`.
