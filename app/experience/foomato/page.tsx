import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowIcon, ThemeToggle, Wordmark } from "@/components/portfolio-shell";
import {
  CalibrationFig,
  EtaServingFig,
  EtaTimelineFig,
  ExploreFig,
  FailuresFig,
  FeatureBar,
  FeedServingFig,
  FoldFig,
  FoomatoSketch,
  FunnelFig,
  HistogramFig,
  InkDefs,
  LadderFig,
  LossFig,
  MatrixFig,
  MaxFig,
  MiniModel,
  PositionFig,
  RetrainFig,
  SeesawFig,
  SignalFig,
  SplitFig,
  Stopwatch,
  SystemMapFig,
  TreeFig,
} from "@/components/foomato";

export const metadata: Metadata = {
  title: "Foomato, the case file · ramaa",
  description: "ML internship at Foomato: a personalised home feed ranker and ETA prediction for food delivery in Nepal, with every decision drawn out.",
};

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

function Head({ no, caption, title, note }: { no: string; caption: string; title: ReactNode; note: string }) {
  return (
    <header className="section-head reveal">
      <span className="label">
        <span className="section-no">{no}</span> {caption}
      </span>
      <h2>{title}</h2>
      <p className="hand head-note">{note}</p>
    </header>
  );
}

function Sub({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <h3 className="cs-sub reveal">
      {children}
      {note && <span className="hand cs-sub-note">{note}</span>}
    </h3>
  );
}

function Aside({ children, h = 85 }: { children: ReactNode; h?: number }) {
  return (
    <p className="cs-aside inked reveal" style={v({ "--h": h })}>
      {children}
    </p>
  );
}

const ownership = [
  { what: "homepage feed ranker", detail: "training, features, offline eval, cold-start fallback", level: "primary ownership", n: 10, h: 25 },
  { what: "ETA model", detail: "features, training, leakage review", level: "pod contribution", n: 6, h: 85 },
  { what: "order-log cleaning + feature tables", detail: "split three ways across the pod", level: "shared", n: 3.4, h: 150 },
  { what: "serving design", detail: "nightly feed cache, live ETA feature fetch", level: "designed with the pod", n: 5, h: 250 },
];

const cleaning = [
  {
    problem: "cancelled or rejected orders",
    eta: "drop",
    recs: "keep, weak negative",
    why: "ETA has no ground-truth delivery time if the order never finished. For the feed, a cancel isn't \"this restaurant is irrelevant\". It can be a rider shortage, a price shock, or someone changing their mind. As a hard negative it poisons cuisine affinity.",
  },
  {
    problem: "timestamp artifacts",
    eta: "clip or drop < 5 or > 120 min",
    recs: "n/a",
    why: "Nepal ops reality. Riders mark delivered late, or in a batch. A 2-minute delivery is a logging bug, not a miracle.",
  },
  {
    problem: "test and staff accounts",
    eta: "blacklist",
    recs: "blacklist",
    why: "A handful of staff accounts order from everywhere, at odd hours, with zero price sensitivity. Left in, they dominate the collaborative signal. Removed before any feature is computed.",
  },
  {
    problem: "vendor churn",
    eta: "keep in training",
    recs: "keep, filter at serve time",
    why: "A restaurant that closed in month 7 still taught the model what momos at lunch in this neighbourhood look like. Deleting it at train time throws that away. Availability is a serve-time business rule.",
  },
  {
    problem: "duplicate or partial timestamps",
    eta: "drop",
    recs: "keep with a flag",
    why: "If delivered_at comes before picked_up_at, or accepted_at is null on a delivered row, the label is broken. The order itself can still be real. The label is only as good as the clock.",
  },
];

const userFeatures = ["order frequency (orders per week, trailing window)", "average order value, giving price-band preference", "cuisine affinity vector (share of delivered orders per cuisine)", "repeat rate with this vendor", "time-of-day pattern (lunch-heavy vs late-night)"];
const vendorFeatures = ["trailing-30-day order volume (popularity)", "rating and historical cancellation rate", "vendor price band", "is_open_now and minutes until close", "vendor primary cuisine"];
const contextFeatures = ["haversine distance, user to vendor", "hour bucket and weekday or weekend", "user-vendor cuisine match (dot of affinity with vendor cuisine)"];

const etaFeatures = [
  "haversine distance, vendor to user",
  "hour-of-day bucket",
  "day of week, weekend flag",
  "restaurant queue load (open orders right now)",
  "rider availability (free riders in the zone)",
  "order size (item count)",
  "order value",
  "vendor trailing-30-day avg prep / delivered time",
  "zone or area id (roads and traffic proxy)",
  "peak flag (lunch 12 to 2, dinner 7 to 9)",
];

const ladder = [
  ["feed retrieval", "hard filters down to 40 to 60 vendors", "Uber: two-tower embeddings + ANN over millions of stores, GraphSAGE user-store and user-dish graphs as extra features", "hundreds of vendors, not millions. ANN is overhead"],
  ["feed ranking", "feature-based ranker on 13 tabular features", "Uber: DLRM / DCNv2 + sequence transformer on real-time streams. Swiggy: GBDT, then pairwise / listwise DNN, then Wide-and-Deep + lattice", "no real-time event stream, no listwise serving path, 200K rows"],
  ["new restaurant", "fixed exploration slot", "Uber: multi-armed bandit on impression budget", "a bandit needs online allocation infra"],
  ["ETA structure", "single-shot total minutes", "Swiggy: O2A + FM + WT + LM with max(dispatch, prep) + last mile. Uber: routing-engine baseline + residual net", "per-leg labels and live rider pings weren't production-clean"],
  ["ETA model class", "XGBoost", "Uber DeepETA (linear transformer residual), DoorDash MoE + probabilistic head, Swiggy MIMO net at cart", "those nets win at their volume and with a router residual. on 10 columns they overfit"],
  ["ETA loss", "point estimate (MAE / MSE family)", "Uber asymmetric Huber, DoorDash asymmetric MSE / quantile / Weibull uncertainty", "MAE kept it readable for ops. asymmetric loss is the next iteration"],
  ["serving", "nightly feed cache, live ETA feature fetch", "Uber: query tower online, store tower offline. Swiggy: precomputed user-geo-mealslot recs in Dynamo on some surfaces", "the right complexity for 20K MAU"],
];

const built = [
  "time-split, leakage-aware feature tables from the order log",
  "a two-stage feed: rules retrieve, the model ranks",
  "implicit-feedback labels with weak negatives, not a dense 0/1 matrix",
  "cold-start fallbacks as first-class serve paths",
  "single-shot XGBoost ETA using only features that exist at checkout",
  "batch feed + live ETA feature fetch",
];

const next = [
  ["put predicted ETA into the feed score", "so a 50-minute perfect match loses to a 22-minute good match."],
  ["quantile ETA (P75 to P80) or an asymmetric loss", "so the checkout number is one we can beat."],
  ["decompose ETA the Swiggy way", "once accepted_at and picked_up_at are trustworthy enough to be labels. at least prep vs transit, even if O2A stays a heuristic."],
  ["exploration accounting", "log when a new vendor was force-inserted, so offline eval doesn't count those impressions as organic ranker failures."],
  ["zone-level ETA calibration", "one model, a per-zone residual correction. Kathmandu ring road at 6pm is not Pokhara at 6pm."],
];

const questions: [string, ReactNode][] = [
  [
    "you said collaborative filtering with 13 features. CF doesn't take features. which was it?",
    <>
      <p>
        Collaborative in the signal, not the algorithm. The ranker was XGBoost with a ranking objective.
      </p>
      <p>
        The collaborative signal (repeat rate, cuisine affinity, vendor popularity) was computed from order history and fed in as
        features, alongside price band, distance and hour. Pure matrix factorisation can&apos;t take those 13 columns, which is
        exactly why we didn&apos;t use it.
      </p>
    </>,
  ],
  [
    "what did you beat, and by how much?",
    <>
      <p>
        Feed baseline: popularity ranking on the same serviceable set, same time split. ETA baselines: a constant 45 minutes, and
        distance divided by city-average speed.
      </p>
      <p>
        Both models beat their baselines on the forward time split. That was the bar for leaving the notebook.
      </p>
    </>,
  ],
  [
    "how did you split train and test?",
    <p>
      By time. Train May 2025 to Mar 2026, validate on Apr 2026, test on May to Jun 2026. A random shuffle leaks future vendors,
      future weather and future taste. Trailing features are computed with a cutoff at the end of train, not over the whole dump.
    </p>,
  ],
  [
    "how did you handle cold start?",
    <p>
      New user: distance-filtered popularity by hour, then personalised after a few delivered orders. New vendor: an exploration
      slot with an impression cap, scored on content features only. At 20K MAU this is default traffic, not a footnote.
    </p>,
  ],
  [
    "why not recommend dishes instead of restaurants?",
    <p>
      The homepage is a restaurant list. Dish ranking is a different inventory, thousands of SKUs with availability by the hour.
      Swiggy splits dish search (retrieve, then rank with query + restaurant + popularity + distance) from the restaurant feed. We
      ranked the thing the UI actually renders.
    </p>,
  ],
  [
    "how do you stop the feed collapsing onto the same three chains?",
    <p>
      Serve-time diversity: cap cuisine and vendor group in the top 10. The exploration slot. And don&apos;t weight vendor popularity
      so heavily that the ranker turns into a sorted bestseller list. Offline, watch unique vendors in the top 10 and the GMV share
      of the top 10 vendors.
    </p>,
  ],
  [
    "where is the leakage in the ETA model?",
    <p>
      Anything only known after assignment or after accept is illegal at checkout. Queue load and free-rider count are legal as
      long as they&apos;re current marketplace state, not this order&apos;s later timestamps.
    </p>,
  ],
  [
    "why do cancelled orders get different treatment in the two models?",
    <p>ETA needs a finished clock. Recs can read a cancel as a weak &ldquo;they considered this vendor&rdquo;. Same row, two labels.</p>,
  ],
  [
    "would you serve the ranker in real time?",
    <p>
      Not at this MAU. Nightly scores plus live availability is simpler and fast enough. Real-time inference pays off when session
      clicks from the last two minutes should move the list. Uber&apos;s recent homefeed work is exactly that freshness jump, days of
      lag down to seconds. We didn&apos;t have the event bus.
    </p>,
  ],
  [
    "how would you know the model is dying in production?",
    <p>
      Feed: rolling conversion, ordered position, search fallback rate, vendor concentration. ETA: rolling MAE and percent late by
      more than 15 minutes, split by zone and peak flag. Three days over threshold means retrain. A sudden jump right after a
      logging change means don&apos;t retrain, fix the clock.
    </p>,
  ],
];

const sources = [
  ["Uber Eats", "Food Discovery with Uber Eats: Using Graph Learning to Power Recommendations", "candidate generation + personalised ranking, GraphSAGE user-restaurant and user-dish graphs"],
  ["Uber Eats", "Innovative Recommendation Applications Using Two Tower Embeddings at Uber", "FPR / SPR, store tower offline, eater tower online, ANN"],
  ["Uber Eats", "Food Discovery with Uber Eats: Recommending for the Marketplace", "eater attributes, new-restaurant bandits, new-eater bootstrap"],
  ["Uber", "DeepETA: How Uber Predicts Arrival Times Using Deep Learning, and DeeprETA", "router baseline + residual, asymmetric Huber"],
  ["Swiggy Bytes", "Evolution of and experiments with feed ranking at Swiggy", "nDCG, ordered-click depth, customer / restaurant / pair features, GBDT"],
  ["Swiggy Bytes", "Learning To Rank Restaurants", "pointwise GBDT limits, pairwise, Wide-and-Deep"],
  ["Swiggy Bytes", "Where is my order? Part I / II, and Predicting Food Delivery Time at Cart", "O2A, FM, WT, LM, max(dispatch, prep) + last_mile, MIMO"],
  ["DoorDash", "ETA posts on quantile and asymmetric MSE", "long-tail lateness, later probabilistic / Weibull heads"],
  ["Zomato", "DP-ETA", "tree models on a right-skewed delivery-time distribution"],
];

export default function FoomatoPage() {
  return (
    <div className="cs">
      <InkDefs />
      <header className="site-header">
        <Wordmark />
        <div className="header-tools">
          <Link className="label cs-back" href="/#experience">
            ← back to the drawer
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="shell">
        <section className="cs-hero">
          <span className="label">case file 01 · ml internship · summer 2026</span>
          <h1 className="cs-title">
            Foomato<span className="cs-title-dot">.</span>
          </h1>
          <p className="hand cs-kicker">feed ranking + ETA prediction, for a food delivery app in Nepal</p>
          <div className="cs-hero-art inked redraw" style={v({ "--h": 25 })}>
            <div className="proj-art">
              <FoomatoSketch id="fm-hero" />
            </div>
          </div>
          <dl className="hero-meta inked" style={v({ "--h": 85 })}>
            <div>
              <dt className="hand">role</dt>
              <dd>ML intern</dd>
              <dd className="label">3-person ML pod</dd>
            </div>
            <div>
              <dt className="hand">when</dt>
              <dd>3 May to 19 Jul</dd>
              <dd className="label">2026 · 11 weeks</dd>
            </div>
            <div>
              <dt className="hand">manager</dt>
              <dd>Shiwam Sah</dd>
              <dd className="label">foomato, nepal</dd>
            </div>
          </dl>
          <dl className="facts">
            {[
              { value: "~20K", label: "monthly active users", h: 25 },
              { value: "~200K", label: "historical orders in the log", h: 85 },
              { value: "13", label: "features in the feed ranker", h: 150 },
              { value: "10", label: "features in the ETA model", h: 250 },
            ].map((f) => (
              <div key={f.label} className="fact inked reveal" style={v({ "--h": f.h })}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
          <p className="label cs-stack">stack · python · pandas · scikit-learn · xgboost</p>
          <p className="lede cs-lede">
            Foomato had 200K orders sitting in a log and used none of them on the two surfaces that lose money, a generic homepage and
            a constant ETA. This is what we built instead, every decision included.
          </p>
        </section>

        <section className="block">
          <Head no="01" caption="the one-minute version" title={<>if you only <em>read this</em></>} note="60 seconds" />
          <div className="minute inked reveal" style={v({ "--h": 25 })}>
            <Stopwatch />
            <p>
              Foomato had 200K orders and used none of them on the two surfaces that lose money, a generic homepage and a constant ETA.
              I owned training for a two-stage feed, hard serviceability filters then a 13-feature ranker on implicit order feedback,
              and I contributed to a 10-feature XGBoost that predicted total delivery minutes at checkout. Both used a time-based
              split. Cancelled orders were dropped for ETA and kept as weak negatives for recs. Cold start was a serve-time fallback,
              not a training footnote. I didn&apos;t ship Uber&apos;s two-tower or Swiggy&apos;s four-leg ETA. At 20K MAU the right system
              was tabular models, a nightly feed cache, and live marketplace features only where the clock is still in the future.
            </p>
          </div>
        </section>

        <section className="block">
          <Head no="02" caption="who owned what" title={<>drawn <em>tightly</em>, on purpose</>} note="no inflation" />
          <ul className="own inked reveal" style={v({ "--h": 25 })}>
            {ownership.map((o) => (
              <li key={o.what} className="own-row" style={v({ "--h": o.h })}>
                <div>
                  <p className="own-what">{o.what}</p>
                  <p className="label">{o.detail}</p>
                </div>
                <svg className="status-bar" viewBox="0 0 200 22" preserveAspectRatio="none" aria-hidden="true">
                  <g filter="url(#ink-edge)">
                    {o.n > 0 && <path className="status-fill" d={`M3 4H${3 + o.n * 19.4}V18H4Z`} />}
                    <path className="status-track" d="M3 4 197 3 196 18 4 18Z" />
                  </g>
                </svg>
                <span className="hand own-level">{o.level}</span>
              </li>
            ))}
          </ul>
          <p className="cs-quote reveal">
            &ldquo;I owned training for the feed ranker. I contributed to the ETA model. The data pipeline was shared.&rdquo;
            <span className="hand">three surfaces, three levels of ownership</span>
          </p>
        </section>

        <section className="block">
          <Head no="03" caption="why the work existed" title={<>two product failures, <em>zero research</em></>} note="logs, never used" />
          <p className="cs-p reveal">
            Foomato already had a working marketplace. What it didn&apos;t have was a model that used the 200K-order log. Neither
            problem was research. Both were &ldquo;we have logs, we never used them.&rdquo;
          </p>
          <FailuresFig />
          <div className="cs-two">
            <div className="cs-card inked reveal" style={v({ "--h": 25 })}>
              <span className="label">failure 1</span>
              <h4>the homepage was a flat list</h4>
              <p>
                Everyone in a city saw the same restaurants, sorted by popularity, alphabet, or whoever paid. Conversion per session
                was low because people scrolled, bounced, or ordered from the three places they already knew. At this scale the
                homepage is the product.
              </p>
              <p>
                Swiggy says the same in public. Feed quality and conversion move together, which is why they watch nDCG, where the
                ordered restaurant sat, the share of orders from the top of the feed, and how often a session falls back to search.
                A bad list sends the user into search or out of the app.
              </p>
            </div>
            <div className="cs-card inked reveal" style={v({ "--h": 50 })}>
              <span className="label">failure 2</span>
              <h4>the ETA was a constant</h4>
              <p>
                Checkout showed &ldquo;45 minutes&rdquo; for everything, or distance × a fixed speed. Underpromise and the user
                abandons checkout. Overpromise and they rate 1 star and support eats the refund.
              </p>
              <p>
                The cost is two-sided. That&apos;s why Uber, DoorDash, Swiggy and Zomato all treat ETA as a first-class model, not a
                copy change.
              </p>
            </div>
          </div>
          <SeesawFig />
        </section>

        <section className="block">
          <Head no="04" caption="the system map" title={<>two models, <em>one log</em></>} note="the whole thing" />
          <SystemMapFig />
        </section>

        <section className="block">
          <Head no="05" caption="the data layer" title={<>where the internship <em>actually went</em></>} note="the real work" />
          <p className="cs-p reveal">
            Most of the calendar time went into the log, not the model class. The raw table was enough to train both systems, as
            long as we were strict about what each timestamp means and what each status is allowed to teach.
          </p>
          <div className="receipt reveal">
            <p className="receipt-head">
              <span>ORDERS</span>
              <span>raw table</span>
            </p>
            <p>order_id · user_id · vendor_id · rider_id</p>
            <p>placed_at · accepted_at · picked_up_at · delivered_at</p>
            <p>items[] · order_value · payment_mode</p>
            <p>user_lat/lng · vendor_lat/lng</p>
            <p>status: delivered / cancelled / rejected</p>
            <p className="receipt-foot">~200,000 rows · thank you, come again</p>
          </div>

          <Sub note="each one moves the model">cleaning decisions</Sub>
          <ul className="clean">
            {cleaning.map((c, i) => (
              <li key={c.problem} className="clean-card inked reveal" style={v({ "--h": [25, 85, 150, 250, 300][i] })}>
                <p className="clean-problem">{c.problem}</p>
                <p className="clean-verdicts">
                  <span className="pill pill-tint" style={v({ "--h": 50 })}>
                    ETA · {c.eta}
                  </span>
                  <span className="pill pill-tint" style={v({ "--h": 195 })}>
                    feed · {c.recs}
                  </span>
                </p>
                <p className="clean-why">{c.why}</p>
              </li>
            ))}
          </ul>
          <HistogramFig />

          <Sub note="the one that fails people">the split</Sub>
          <p className="cs-p reveal">
            Wrong is a random 80/20 shuffle. Right is time-based and forward. A random split lets the model see June while being
            scored on April. Taste drifts, new vendors appear, monsoon traffic starts, festivals hit Kathmandu. The offline number
            looks great and production is worse.
          </p>
          <SplitFig />
          <p className="cs-p reveal">
            No user, vendor, or session that exists only in the future gets into training features. Trailing-30-day popularity is
            computed with a cutoff at the last training timestamp, not over the last 30 days of the whole dump. Any time-ordered
            marketplace (feed, ETA, fraud, pricing) has to respect this.
          </p>
        </section>

        <section className="block">
          <Head no="06" caption="system A · personalised home feed" title={<>rules retrieve, <em>the model ranks</em></>} note="my part" />
          <Sub>what the problem is not</Sub>
          <p className="cs-p reveal">
            The feed isn&apos;t &ldquo;predict what the user wants to eat&rdquo;. That framing gets you a model that spends itself
            learning business rules (closed restaurants are bad, out-of-radius restaurants are bad) and has nothing left for taste.
          </p>
          <p className="cs-p reveal">
            It&apos;s a two-stage funnel. Uber Eats calls it candidate generation then personalised ranking, or first-pass retrieval
            (FPR) and second-pass ranking (SPR). Swiggy&apos;s public feed posts have the same shape. Shrink the city-wide set first,
            then score what&apos;s left for this user at this hour. We built the small-city version.
          </p>
          <FunnelFig />
          <div className="cs-two">
            <div className="cs-card inked reveal" style={v({ "--h": 250 })}>
              <span className="label">at uber scale</span>
              <p>
                Stage 1 stops being a filter list. Store embeddings are precomputed offline into an ANN index, and a query-tower
                embedding of the eater retrieves at request time (two-tower). GraphSAGE embeddings over user-restaurant and user-dish
                graphs later became extra ranking features. That machinery exists because the corpus is millions of stores, not 400.
              </p>
            </div>
            <div className="cs-card inked reveal" style={v({ "--h": 150 })}>
              <span className="label">the closer cousin</span>
              <p>
                Swiggy&apos;s early ranker. Customer features, restaurant features, customer-restaurant features, gradient-boosted
                trees, orders as positives. Later posts move to pairwise and listwise deep models, then Wide-and-Deep with lattice
                layers. We were at the GBDT and hybrid-feature stage of that curve.
              </p>
            </div>
          </div>
          <Aside h={25}>
            At 20K MAU and a few hundred vendors per city, a rule filter plus a tabular ranker is the correct system. It isn&apos;t a
            smaller copy of their two-tower.
          </Aside>

          <Sub note="five, five, three">the 13 features</Sub>
          <FeatureBar />
          <div className="feat-cols">
            {[
              { title: "user side", items: userFeatures, start: 1, h: 25 },
              { title: "vendor side", items: vendorFeatures, start: 6, h: 150 },
              { title: "context + interaction", items: contextFeatures, start: 11, h: 250 },
            ].map((g) => (
              <div key={g.title} className="feat-col inked reveal" style={v({ "--h": g.h })}>
                <p className="hand feat-title">{g.title}</p>
                <ol start={g.start}>
                  {g.items.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <p className="cs-p reveal">
            Why 13 and not 80? At 200K rows a wide, sparse feature set overfits the handful of power users. Every feature had to be
            computable at train-cutoff time and again at serve time, from the same definition.
          </p>
          <p className="cs-p reveal">
            What the big apps add once they have the data: real-time session sequences, listwise interaction among on-screen
            candidates, fee and promo, diversity constraints so the top 10 isn&apos;t eight momo shops, and predicted ETA as a ranking
            feature. That last one is the obvious next input. A perfect taste match 55 minutes away should lose to a good-enough match
            22 minutes away. We didn&apos;t close that loop in the window.
          </p>

          <Sub note="collaborative signal, tree-based ranker">the model</Sub>
          <p className="cs-p reveal">
            The ranker was XGBoost with a ranking objective, trained on implicit positives (ordered) against sampled negatives (shown
            and not ordered, or in-zone and not ordered). It&apos;s hybrid because the collaborative signal lives inside the features.
            Repeat rate, cuisine affinity and vendor popularity are all computed from who ordered where, and they sit next to content
            and context features like price band, distance and hour. Same shape as Swiggy&apos;s early feed ranker.
          </p>
          <div className="triad">
            <div className="triad-card inked reveal" style={v({ "--h": 195 })}>
              <MiniModel kind="c" />
              <h4>13 features in, a score out</h4>
              <p className="triad-d">Each serviceable vendor gets a relevance score for this user at this hour. Sort descending, done.</p>
            </div>
            <div className="triad-card inked reveal" style={v({ "--h": 25 })}>
              <MiniModel kind="a" />
              <h4>why not pure matrix factorisation</h4>
              <p className="triad-d">ALS factorises a user × vendor matrix and can&apos;t take features. It has nothing to say about a user with no history, and it can&apos;t see that a vendor is 9 km away at 11pm.</p>
            </div>
            <div className="triad-card inked reveal" style={v({ "--h": 150 })}>
              <MiniModel kind="b" />
              <h4>why trees</h4>
              <p className="triad-d">Thirteen tabular columns, 200K rows, strong interactions like distance × hour. One library across both models, which a 3-person pod appreciates.</p>
            </div>
          </div>
          <p className="cs-quote reveal">
            &ldquo;It was a feature-based ranking model over historical orders. Collaborative signal lived in the features (repeat
            rate, cuisine affinity, vendor popularity), not in a matrix factorisation that ignored side information.&rdquo;
            <span className="hand">collaborative in the signal, gradient-boosted in the algorithm</span>
          </p>

          <Sub note="the real modelling subtlety">implicit feedback</Sub>
          <SignalFig />
          <p className="cs-p reveal">
            The classic mistake is <code>label = 1 if ordered else 0</code> over the full user × vendor matrix. It teaches the model
            that everything it didn&apos;t show you is irrelevant, which is false, and then it refuses to surface anything new.
          </p>
          <MatrixFig />
          <p className="cs-p reveal">
            The standard fix, from the implicit-ALS paper, is confidence weighting. Positives get confidence proportional to
            interaction strength, and unobserved pairs get a small baseline instead of a hard zero. For our ranker the
            equivalent was sampling negatives from the candidate set the user could actually have seen (in radius, open, on a previous
            homepage), not from the whole city catalogue.
          </p>
          <PositionFig />
          <p className="cs-p reveal">
            Position bias exists even at our scale. Our defence was to beat the popularity baseline on a time split, then check
            where the ordered vendor sat in the new list.
          </p>

          <Sub note="not an edge case">cold start is a main path</Sub>
          <LadderFig />
          <p className="cs-p reveal">
            A new user has no history, nothing to factorise, and an empty cuisine vector. A model that only works after the 20th
            order is a model for a minority of traffic. Uber Eats wrote that new eaters need an explicit bootstrap, and used a bag of
            recently ordered store ids as a user feature so two-tower retrieval degrades gently for an unseen eater_id. We had no
            two-tower. The analog is to never key the model on a user embedding that doesn&apos;t exist. Key it on geo, hour and vendor
            priors until there&apos;s history.
          </p>
          <ExploreFig />
          <p className="cs-p reveal">
            A new vendor has no orders, so it never surfaces, so it never gets orders. The fallback was a reserved exploration slot
            (positions 4 to 6) with a fixed impression budget, scored on content features only: cuisine, price band,
            distance, rating if any. Uber Eats runs a multi-armed bandit here so exploration spend goes to restaurants that convert.
          </p>
          <Aside h={150}>
            <span className="hand cs-aside-title">new city, thin geo</span>
            Same as a new user, plus one rule. Don&apos;t train a collaborative model on 400 orders. Popularity + distance + hours is
            the whole system until the city has density.
          </Aside>

          <Sub note="beat popularity or it's theatre">how I evaluated the feed</Sub>
          <FoldFig />
          <div className="cs-two">
            <div className="cs-card inked reveal" style={v({ "--h": 195 })}>
              <span className="label">offline</span>
              <ul className="cs-list">
                <li>Precision@K and Recall@K with K = 10, because a phone screen holds about ten cards before the fold.</li>
                <li>NDCG@10 when position matters, not just presence. Swiggy also publishes MRR, median click depth and median ordered-click depth.</li>
                <li>The baseline that must lose: popularity-only ranking on the same serviceable set, same time split.</li>
                <li>Secondary check: share of test orders whose vendor lands in the model&apos;s top 10 vs the popularity top 10.</li>
              </ul>
            </div>
            <div className="cs-card inked reveal" style={v({ "--h": 300 })}>
              <span className="label">online</span>
              <ul className="cs-list">
                <li>CTR on feed cards</li>
                <li>session to order conversion</li>
                <li>position of the ordered vendor</li>
                <li>guardrail: search usage. if more people search, the feed got worse</li>
                <li>guardrail: vendor concentration. the top 10 vendors shouldn&apos;t eat even more GMV</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="block">
          <Head no="07" caption="system B · ETA prediction" title={<>how long is <em>45 minutes</em>, really</>} note="pod work" />
          <Sub>define the target before any feature</Sub>
          <EtaTimelineFig />
          <p className="cs-p reveal">
            Industry practice is to decompose this, because prep is a restaurant property and transit is a road and rider property. One
            model mixes them. Swiggy&apos;s public writing is the clearest version: O2A (order to rider assignment), FM (first mile,
            rider to restaurant), WT (wait at the restaurant) and LM (last mile, restaurant to customer).
          </p>
          <MaxFig />
          <div className="cs-two">
            <div className="cs-card inked reveal" style={v({ "--h": 250 })}>
              <span className="label">the big apps</span>
              <p>
                Swiggy later trained a multi-input multi-output network so O2A, FM, WT, LM and their totals share representation, and
                refreshes each leg as live pings come in. Uber&apos;s DeepETA predicts the residual on top of a routing-engine baseline,
                with an asymmetric Huber loss so late costs more than early. DoorDash went from quantile loss to asymmetric MSE, then
                to probabilistic Weibull-style heads that show a range instead of a fake-precise 32.
              </p>
            </div>
            <div className="cs-card inked reveal" style={v({ "--h": 50 })}>
              <span className="label">what we did</span>
              <p>
                The single-shot version. Predict total minutes from placed_at to delivered_at directly. At 200K orders that&apos;s the
                right call. Four-leg MIMO needs clean per-leg labels at every timestamp and live rider pings at serve time, and we
                didn&apos;t have that maturity.
              </p>
            </div>
          </div>
          <div className="cs-versus reveal">
            <div>
              <p className="hand">at checkout you don&apos;t know</p>
              <p>which rider gets assigned, or when the restaurant will accept</p>
            </div>
            <span className="cs-vs">≠</span>
            <div>
              <p className="hand">on the tracking screen you do</p>
              <p>so features legal there can be leakage at checkout</p>
            </div>
          </div>

          <Sub note="all known at checkout">the 10 features</Sub>
          <ol className="eta-feats reveal">
            {etaFeatures.map((f) => (
              <li key={f} className="is-sure">
                {f}
              </li>
            ))}
          </ol>
          <div className="cs-two">
            <div className="cs-card inked reveal" style={v({ "--h": 25 })}>
              <span className="label">deliberately not used at checkout</span>
              <ul className="cs-list cs-struck">
                <li>actual rider speed on this trip</li>
                <li>time the restaurant took to accept this order</li>
                <li>real pickup-to-drop minutes on this order</li>
              </ul>
              <p className="cs-small">Those are labels, or post-assignment facts. In a checkout model they&apos;re leakage. Accept time in a tracking-screen refresh is legal.</p>
            </div>
            <div className="cs-card inked reveal" style={v({ "--h": 150 })}>
              <span className="label">an uber lesson that still applies</span>
              <p>
                Continuous features like distance and historical prep work better quantile-bucketed than raw. Trees can split raw
                values, but bucket + target statistics still helps when a zone has a long tail of 90-minute disasters.
              </p>
            </div>
          </div>

          <Sub note="and not a net">why XGBoost</Sub>
          <TreeFig />
          <ul className="cs-list cs-p reveal">
            <li>Tabular, about 10 features, about 200K rows after cleaning.</li>
            <li>A deep net starts beating GBDT on tabular only with far more data, or with sequences, images, or a routing-engine residual to encode. Uber moved off large XGBoost after reaching global scale and a residual-on-router problem. Swiggy&apos;s first last-mile model was GBT with absolute loss, and they moved to nets once live GPS pings and frequent refreshes made a static tree awkward.</li>
            <li>XGBoost trains in seconds, ships as one file, and gives feature importance. For a 3-person pod that matters.</li>
          </ul>
          <p className="cs-quote reveal">
            &ldquo;ETA at our scale is structured-data regression, not representation learning. Gradient-boosted trees are still the
            default production choice for this table.&rdquo;
          </p>

          <Sub note="the business isn't symmetric">loss</Sub>
          <LossFig />
          <div className="cs-two">
            <div className="cs-card inked reveal" style={v({ "--h": 25 })}>
              <span className="label">underestimate · shown 30, arrived 45</span>
              <p>
                <strong>user</strong> anger, 1 star, &ldquo;where is my food&rdquo;, refund risk
              </p>
              <p>
                <strong>company</strong> support load, coupons, churn
              </p>
            </div>
            <div className="cs-card inked reveal" style={v({ "--h": 150 })}>
              <span className="label">overestimate · shown 45, arrived 30</span>
              <p>
                <strong>user</strong> mild annoyance, or a pleasant surprise
              </p>
              <p>
                <strong>company</strong> slightly lower checkout conversion if the number looks slow
              </p>
            </div>
          </div>
          <p className="cs-p reveal">
            Uber&apos;s DeepETA uses asymmetric Huber, with delta for outlier robustness and omega for late vs early. DoorDash published
            asymmetric MSE and, earlier, quantile loss aimed at a high percentile so the quote is biased late on purpose. Zomato&apos;s
            DP-ETA used tree models on a right-skewed distribution (gamma and Tweedie-style thinking) instead of pretending the target
            is Gaussian.
          </p>
          <p className="cs-quote reveal">
            &ldquo;We optimised MAE because ops can read minutes. That treats late and early the same. The next version should predict
            a high quantile (P70 to P80) or use an asymmetric objective, so the number we show is the one we can beat.&rdquo;
            <span className="hand">MAE now, a quantile objective next</span>
          </p>

          <Sub note="what support actually cares about">ETA metrics</Sub>
          <div className="metric-row">
            {[
              ["MAE", "in minutes. primary, the number ops understands"],
              ["RMSE", "punishes the 90-minute disasters that make tickets"],
              ["± 5 min", "percent of orders within five minutes"],
              ["> 15 late", "the refund and 1-star tail"],
            ].map(([k, d], i) => (
              <div key={k} className="fact inked reveal" style={v({ "--h": [195, 25, 150, 50][i] })}>
                <dt>{k}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </div>
          <p className="cs-p reveal">
            Baselines: the old constant 45 minutes, and haversine km divided by average city speed. The model beat both on the
            forward split.
          </p>
          <CalibrationFig />
        </section>

        <section className="block">
          <Head no="08" caption="serving" title={<>what happens <em>after the notebook</em></>} note="the production path" />
          <p className="cs-p reveal">
            At 20K MAU we didn&apos;t need Uber&apos;s real-time two-tower path. We needed something a 3-person pod could operate. This is the serving design.
          </p>
          <FeedServingFig />
          <p className="cs-p reveal">
            Uber Eats later split ranking hydration from presentation hydration so scoring doesn&apos;t wait on images and promo copy.
            We didn&apos;t have that problem, but the principle holds. Don&apos;t block the rank on fields the ranker doesn&apos;t use.
          </p>
          <EtaServingFig />
          <p className="cs-p reveal">
            ETA gets called live at checkout and refreshed on the tracking screen if there&apos;s a second call. Vendor queue and rider
            availability have to be now, not last night&apos;s snapshot, or the model is a dressed-up historical average.
          </p>
          <RetrainFig />
          <div className="cs-two">
            <div className="cs-card inked reveal" style={v({ "--h": 195 })}>
              <span className="label">feed · weekly</span>
              <p>Off-cycle trigger: a new-vendor flood, or offline NDCG vs popularity collapsing on the rolling week.</p>
            </div>
            <div className="cs-card inked reveal" style={v({ "--h": 85 })}>
              <span className="label">ETA · weekly to biweekly</span>
              <p>Off-cycle trigger: rolling MAE above threshold for 3 days straight, monsoon onset, festival week.</p>
            </div>
          </div>
        </section>

        <section className="block">
          <Head no="09" caption="the scale ladder" title={<>us vs the giants, <em>without pretending</em></>} note="not name-dropping" />
          <div className="scale reveal">
            <div className="scale-row scale-head label">
              <span>problem</span>
              <span>what we did at foomato</span>
              <span>what the large apps run</span>
              <span>why we didn&apos;t copy them</span>
            </div>
            {ladder.map(([p, us, them, why]) => (
              <div key={p} className="scale-row">
                <span className="hand scale-p">{p}</span>
                <span className="scale-us">{us}</span>
                <span className="scale-them">{them}</span>
                <span className="scale-why">{why}</span>
              </div>
            ))}
          </div>
          <Sub note="at our scale">what I did implement, end to end</Sub>
          <ol className="built">
            {built.map((b, i) => (
              <li key={b} className="reveal" style={v({ "--i": i })}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path className="sk-ink" pathLength={1} d="M4 13l5 5L20 6" />
                </svg>
                {b}
              </li>
            ))}
          </ol>
          <p className="cs-quote reveal">
            That&apos;s a complete system. It isn&apos;t DeepETA, and I won&apos;t call it DeepETA.
          </p>
        </section>

        <section className="block">
          <Head no="10" caption="if I had another month" title={<>the <em>next five</em> things</>} note="the todo list" />
          <ul className="todo">
            {next.map(([t, d]) => (
              <li key={t} className="reveal">
                <span className="todo-box" aria-hidden="true" />
                <p>
                  <strong>{t}</strong> {d}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="block">
          <Head no="11" caption="questions people ask me" title={<>go on, <em>poke holes</em></>} note="tap to open" />
          <div className="qa">
            {questions.map(([q, a], i) => (
              <details key={q} className="qa-item inked reveal" style={v({ "--h": [25, 85, 150, 250, 300, 195, 50][i % 7] })}>
                <summary>
                  <span className="label">q{i + 1}</span>
                  <span className="qa-q">{q}</span>
                  <span className="qa-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="qa-a">{a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="block">
          <Head no="12" caption="sources" title={<>the <em>industry map</em>, cited</>} note="public write-ups" />
          <p className="cs-p reveal">These fill the &ldquo;how the same problem is solved at scale&rdquo; parts. None of them are Foomato internal docs.</p>
          <ul className="sources reveal">
            {sources.map(([who, title, what]) => (
              <li key={title}>
                <span className="label">{who}</span>
                <span className="sources-title">{title}</span>
                <span className="sources-what">{what}</span>
              </li>
            ))}
          </ul>
          <div className="hero-actions">
            <Link className="button" href="/#experience">
              back to the portfolio
              <ArrowIcon />
            </Link>
            <a className="button button-ghost" href="mailto:hire.ramaa@gmail.com">
              ask me about it
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

