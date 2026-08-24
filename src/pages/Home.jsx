import { Link } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";
import { getAllEvents } from "../utils/storage.js";

const benefits = [
  {
    number: "01",
    title: "One clear calendar",
    text: "Find every fest, workshop, match and meet-up without chasing scattered announcements.",
  },
  {
    number: "02",
    title: "Built for student life",
    text: "Save the events that matter, register in seconds and keep your plans in one place.",
  },
  {
    number: "03",
    title: "Always in the loop",
    text: "Get the details you need at a glance: when, where, who is hosting and how many seats remain.",
  },
];

export default function Home() {
  const allEvents = getAllEvents();
  const featured = allEvents.slice(0, 3);
  const categories = [
    "Technical",
    "Cultural",
    "Sports",
    "Workshop",
    "Seminar",
    "Hackathon",
  ];

  return (
    <main className="landing-page">
      <section className="hero landing-hero">
        <div className="hero-grid container">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" /> The campus, in sync
            </p>
            <h1>
              Make room for the moments{" "}
              <span className="accent-text">you&apos;ll remember.</span>
            </h1>
            <p className="hero-lede">
              CampusConnect brings your university&apos;s energy into one
              lively, easy-to-use place. Discover what&apos;s happening next and
              show up for more of it.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="btn">
                Explore events <span aria-hidden="true">↗</span>
              </Link>
              <Link to="/login" className="text-link">
                Create your account <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>AK</span>
                <span>RM</span>
                <span>JS</span>
                <span>+</span>
              </div>
              <p>
                <strong>Made for campus people</strong>
                <br />
                Plan less. Participate more.
              </p>
            </div>
          </div>

          <div className="hero-feature" aria-label="Featured event preview">
            <div className="feature-topline">
              <span>Next up</span>
              <span className="pulse-label">
                <i /> Live calendar
              </span>
            </div>
            <div className="feature-date">
              <strong>05</strong>
              <span>
                SEP
                <br />
                2026
              </span>
            </div>
            <p className="feature-category">TECHNICAL / 10:00 AM</p>
            <h2>
              CodeSprint
              <br />
              24hr Hackathon
            </h2>
            <p className="feature-meta">
              CS Block Auditorium <span>•</span> 12 seats left
            </p>
            <Link to="/events/1" className="feature-link">
              View event details <span aria-hidden="true">↗</span>
            </Link>
            <div className="feature-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      <div className="announce-strip landing-strip">
        <div className="container">
          <p>
            <span>WHAT&apos;S HAPPENING</span> Venue update: CodeSprint is now
            at CS Block Auditorium <b>+</b> Football Cup closes early
          </p>
        </div>
      </div>

      <section className="section landing-section" id="featured">
        <div className="container">
          <div className="section-head landing-section-head">
            <div>
              <p className="eyebrow">Find your next thing</p>
              <h2>There&apos;s always something on.</h2>
            </div>
            <Link to="/events" className="outline-link">
              See all events <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="category-row">
            {categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
          <div className="event-grid">
            {featured.map((event) => (
              <EventCard key={event.id} ev={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="section benefits-section">
        <div className="container">
          <div className="section-head landing-section-head">
            <div>
              <p className="eyebrow">Why CampusConnect</p>
              <h2>
                Less searching.
                <br />
                <span className="accent-text">More showing up.</span>
              </h2>
            </div>
            <p className="section-note">
              A simpler way to stay close to the pulse of your campus.
            </p>
          </div>
          <div className="benefit-grid">
            {benefits.map((benefit) => (
              <article className="benefit" key={benefit.number}>
                <span>{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <p className="eyebrow">Your campus is happening now</p>
          <h2>Don&apos;t hear about it later.</h2>
          <Link to="/login" className="btn">
            Join CampusConnect <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
