import React, { useState } from 'react';
import './App.css';

// Constants for prize calculations
const ENTRY_FEE = 5; // $5 entry fee per player
const PRIZE_POOL_PERCENTAGE = 0.40; // 40% of total entry fees go to prize pool
const WINNERS_PERCENTAGE = 0.10; // Top 10% of players win prizes

// List of Victorian golf clubs
const victorianGolfClubs = [
  'Royal Melbourne Golf Club',
  'Victoria Golf Club',
  'Kingston Heath Golf Club',
  'Metropolitan Golf Club',
  'Commonwealth Golf Club',
  'Yarra Yarra Golf Club',
  'Huntingdale Golf Club',
  'Woodlands Golf Club',
  'Spring Valley Golf Club',
  'Keysborough Golf Club',
  'Sandhurst Club',
  'Heritage Golf & Country Club',
  'The National Golf Club',
  'Peninsula Kingswood Country Golf Club',
  'Barwon Heads Golf Club',
  'Thirteenth Beach Golf Club',
  'Portsea Golf Club',
  'Sorrento Golf Club',
  'Flinders Golf Club',
  'Rosebud Country Club'
];

// Function to generate random golf scores (between 65 and 95)
const generateRandomScore = () => Math.floor(Math.random() * 31) + 65;

// Function to generate random names
const firstNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 
                   'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
                  'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White'];

const generateRandomName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName.charAt(0)}.`;
};

// Function to generate a random golf club
const generateRandomGolfClub = () => {
  return victorianGolfClubs[Math.floor(Math.random() * victorianGolfClubs.length)];
};

// Function to calculate prize money distribution
const calculatePrizeMoney = (results) => {
  const totalEntries = results.length;
  const totalPrizePool = totalEntries * ENTRY_FEE * PRIZE_POOL_PERCENTAGE;
  const numberOfWinners = Math.max(1, Math.floor(totalEntries * WINNERS_PERCENTAGE));
  
  // Calculate equal prize money for each winner
  const prizePerWinner = Math.floor(totalPrizePool / numberOfWinners);

  // Add prize money to results
  return results.map((result, index) => ({
    ...result,
    prize: index < numberOfWinners ? prizePerWinner : 0,
    position: index + 1
  }));
};

// Generate mock competition results
const generateMockResults = (date) => {
  const results = [];
  for (let i = 0; i < 50; i++) {
    results.push({
      name: generateRandomName(),
      golfClub: generateRandomGolfClub(),
      score: generateRandomScore()
    });
  }
  // Sort results by score (ascending) and add prize money
  return calculatePrizeMoney(results.sort((a, b) => a.score - b.score));
};

function HomePage({ onNavigate }) {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Connected Golf</h1>
        <p className="tagline">Uniting Golf Clubs Across Victoria</p>
        <div className="cta-buttons">
          <button onClick={() => onNavigate('competition')} className="primary-button">
            Enter Competition
          </button>
          <button onClick={() => onNavigate('auth')} className="secondary-button">
            Register / Login
          </button>
        </div>
      </div>
      <div className="powered-by">
        <p>Powered by</p>
        <div className="ga-logo"></div>
      </div>
    </div>
  );
}

function App() {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [selectedDate, setSelectedDate] = useState('');
 const [activeTab, setActiveTab] = useState('home');

 // Mock data for competition results with 50 entries per date
 const mockCompetitionResults = {
   '2024-06-01': generateMockResults('2024-06-01'),
   '2024-06-08': generateMockResults('2024-06-08'),
   '2024-06-15': generateMockResults('2024-06-15'),
   '2024-06-22': generateMockResults('2024-06-22'),
   '2024-06-29': generateMockResults('2024-06-29'),
 };

 const availableDates = Object.keys(mockCompetitionResults);

 const handleLoginToggle = () => {
   setIsLoggedIn(!isLoggedIn);
   // In a real app, this would involve actual authentication logic
 };

 const handleDateChange = (event) => {
   setSelectedDate(event.target.value);
 };

 const handleTabChange = (tab) => {
   setActiveTab(tab);
 };

 const currentResults = mockCompetitionResults[selectedDate] || [];

 return (
   <div className="App">
     <header className="App-header">
       <nav className="navbar">
         <h1>Connected Golf</h1>
         {activeTab !== 'home' && (
           <div className="nav-links">
             <button 
               className={`tab-button ${activeTab === 'competition' ? 'active' : ''}`}
               onClick={() => handleTabChange('competition')}
             >
               Competition Entry
             </button>
             <button 
               className={`tab-button ${activeTab === 'auth' ? 'active' : ''}`}
               onClick={() => handleTabChange('auth')}
             >
               Register/Login
             </button>
             {isLoggedIn && (
               <button 
                 className={`tab-button ${activeTab === 'results' ? 'active' : ''}`}
                 onClick={() => handleTabChange('results')}
               >
                 Results
               </button>
             )}
           </div>
         )}
         {activeTab !== 'home' && (
           <button className="login-toggle-button" onClick={handleLoginToggle}>
             {isLoggedIn ? 'Logout' : 'Login (Demo)'}
           </button>
         )}
       </nav>
     </header>
     <main>
       {activeTab === 'home' ? (
         <HomePage onNavigate={handleTabChange} />
       ) : (
         <>
           {activeTab === 'competition' && (
             <section className="competition-entry-section">
               <h2>Enter Competition</h2>
               <form>
                 <label htmlFor="golflink-id">Golflink ID:</label>
                 <input type="text" id="golflink-id" name="golflink-id" placeholder="Your Golflink ID" />

                 <label htmlFor="competition-date">Competition Date:</label>
                 <input type="date" id="competition-date" name="competition-date" />

                 <button type="submit">Submit Entry</button>
               </form>
             </section>
           )}

           {activeTab === 'auth' && (
             <section className="auth-section">
               <h2>Register / Login</h2>
               <form>
                 <label htmlFor="email">Email:</label>
                 <input type="email" id="email" name="email" placeholder="Your email" />

                 <label htmlFor="password">Password:</label>
                 <input type="password" id="password" name="password" placeholder="Your password" />

                 <button type="submit">Login</button>
                 <button type="button">Register</button>
               </form>
             </section>
           )}

           {isLoggedIn && activeTab === 'results' && (
             <section className="results-section">
               <h2>Competition Results</h2>
               <div className="date-selector">
                 <label htmlFor="select-date">Select Date:</label>
                 <select id="select-date" value={selectedDate} onChange={handleDateChange}>
                   <option value="">-- Select a Date --</option>
                   {availableDates.map((date) => (
                     <option key={date} value={date}>
                       {date}
                     </option>
                   ))}
                 </select>
               </div>

               {selectedDate && currentResults.length > 0 ? (
                 <div className="results-table-container">
                   <h3>Results for {selectedDate}</h3>
                   <div className="prize-pool-info">
                     <p>Entry Fee: ${ENTRY_FEE}</p>
                     <p>Total Prize Pool: ${currentResults.length * ENTRY_FEE * PRIZE_POOL_PERCENTAGE}</p>
                     <p>Number of Winners: {Math.max(1, Math.floor(currentResults.length * WINNERS_PERCENTAGE))}</p>
                   </div>
                   <table>
                     <thead>
                       <tr>
                         <th>Position</th>
                         <th>Name</th>
                         <th>Golf Club</th>
                         <th>Score</th>
                         <th>Prize Money</th>
                       </tr>
                     </thead>
                     <tbody>
                       {currentResults.map((result) => (
                         <tr key={result.name + result.golfClub} className={result.prize > 0 ? 'winner' : ''}>
                           <td>{result.position}</td>
                           <td>{result.name}</td>
                           <td>{result.golfClub}</td>
                           <td>{result.score}</td>
                           <td>{result.prize > 0 ? `$${result.prize}` : '-'}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               ) : selectedDate && currentResults.length === 0 ? (
                   <p>No results available for {selectedDate}.</p>
               ) : (
                 <p>Please select a date to view results.</p>
               )}
             </section>
           )}
         </>
       )}
     </main>
   </div>
 );
}

export default App;
