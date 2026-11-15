import React from 'react';
import { Link } from 'react-router-dom';

const SECTIONS = [
  { to: '/activities', title: 'Activities', text: 'See the workouts students have logged.' },
  { to: '/leaderboard', title: 'Leaderboard', text: 'Check who is leading the fitness challenge.' },
  { to: '/teams', title: 'Teams', text: 'Browse the teams competing this month.' },
  { to: '/users', title: 'Users', text: 'View the students registered in OctoFit.' },
  { to: '/workouts', title: 'Workouts', text: 'Find training plans for every fitness level.' },
];

function Home() {
  return (
    <div>
      <div className="p-4 mb-4 bg-white rounded-3 shadow-sm">
        <h1 className="display-5">Welcome to OctoFit Tracker</h1>
        <p className="lead mb-0">Mergington High School's fitness tracker: log activities, join teams and climb the leaderboard.</p>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {SECTIONS.map((section) => (
          <div className="col" key={section.to}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title h4">{section.title}</h2>
                <p className="card-text">{section.text}</p>
                <Link className="btn btn-primary stretched-link" to={section.to}>
                  Open {section.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
