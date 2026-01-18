import React, { useState, useMemo } from 'react';

export default function MoveOutGuide() {
  const [activeTab, setActiveTab] = useState('budget');
  const [selectedLocation, setSelectedLocation] = useState('marina');
  const [hasRoommate, setHasRoommate] = useState(false);
  const [hourlyWage, setHourlyWage] = useState(14);
  const [hoursPerWeek, setHoursPerWeek] = useState(35);
  const [hasCar, setHasCar] = useState(true);
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [hoveredJob, setHoveredJob] = useState(null);
  
  const [expenses, setExpenses] = useState({
    food: 300,
    phone: 50,
    car: 150,
    gas: 120,
    carInsurance: 150,
    entertainment: 100,
    savings: 100,
    other: 50,
  });

  const locations = {
    marina: {
      name: "Marina Bay",
      area: "Seabrook",
      emoji: "🌊",
      color: "cyan",
      transit: "Car needed",
      vibe: "Beach vibes, Kemah Boardwalk jobs",
    },
    sandy: {
      name: "Lynbrook", 
      area: "Houston",
      emoji: "🏙️",
      color: "orange",
      transit: "Bus available",
      vibe: "Urban, Memorial City Mall area",
    }
  };

  const allJobs = {
    marina: [
      // Food & Entertainment
      { id: 1, name: "Kemah Boardwalk", type: "food", pay: "$12-16/hr", distance: 2.5, hot: true },
      { id: 2, name: "Landry's Seafood", type: "food", pay: "$10-22/hr", distance: 2.5, hot: true },
      { id: 3, name: "Bubba Gump Shrimp", type: "food", pay: "$11-20/hr", distance: 2.5 },
      { id: 4, name: "Saltgrass Steakhouse", type: "food", pay: "$10-18/hr", distance: 2.6 },
      { id: 5, name: "Starbucks Kemah", type: "food", pay: "$12-17/hr", distance: 2.3 },
      // Retail
      { id: 6, name: "Baybrook Mall", type: "retail", pay: "$12-16/hr", distance: 8.2 },
      { id: 7, name: "Target Webster", type: "retail", pay: "$15-18/hr", distance: 6.5, hot: true },
      { id: 8, name: "Kroger Seabrook", type: "retail", pay: "$12-15/hr", distance: 2.8 },
      // Hotels
      { id: 9, name: "Boardwalk Inn", type: "hotel", pay: "$13-17/hr", distance: 2.5 },
      { id: 10, name: "Hampton Inn Webster", type: "hotel", pay: "$13-16/hr", distance: 5.8 },
      // 🔧 TRADES & CONSTRUCTION
      { id: 11, name: "South Coast Welding", type: "trades", pay: "$16-24/hr", distance: 4.2, hot: true },
      { id: 12, name: "Kirby Marine (Shipyard)", type: "trades", pay: "$17-25/hr", distance: 5.5, hot: true },
      { id: 13, name: "Gulf Coast Boat Repair", type: "trades", pay: "$14-20/hr", distance: 3.8 },
      { id: 14, name: "Clear Lake Construction", type: "construction", pay: "$15-22/hr", distance: 4.5, hot: true },
      { id: 15, name: "Perry Homes (Framing Crew)", type: "construction", pay: "$16-24/hr", distance: 7.2, hot: true },
      { id: 16, name: "ABC Roofing", type: "construction", pay: "$15-21/hr", distance: 6.1 },
      { id: 17, name: "Marek Brothers Drywall", type: "construction", pay: "$14-20/hr", distance: 8.5 },
      // 🚗 AUTO
      { id: 18, name: "Caliber Collision", type: "auto", pay: "$14-22/hr", distance: 5.2, hot: true },
      { id: 19, name: "Firestone Webster", type: "auto", pay: "$13-19/hr", distance: 6.0 },
      { id: 20, name: "Take 5 Oil Change", type: "auto", pay: "$12-16/hr", distance: 4.8 },
      { id: 21, name: "O'Reilly Auto Parts", type: "retail", pay: "$12-16/hr", distance: 3.5 },
      // Warehouse & Labor
      { id: 22, name: "Floor & Decor Warehouse", type: "warehouse", pay: "$14-18/hr", distance: 9.2 },
      { id: 23, name: "84 Lumber Yard", type: "warehouse", pay: "$15-19/hr", distance: 7.8, hot: true },
      { id: 24, name: "ABC Supply (Roofing)", type: "warehouse", pay: "$14-18/hr", distance: 8.1 },
    ],
    sandy: [
      // Food
      { id: 101, name: "City Centre Restaurants", type: "food", pay: "$10-22/hr", distance: 4.1, hot: true },
      { id: 102, name: "Chili's", type: "food", pay: "$10-18/hr", distance: 1.5 },
      { id: 103, name: "Whataburger", type: "food", pay: "$11-15/hr", distance: 1.2 },
      { id: 104, name: "Pappadeaux", type: "food", pay: "$12-24/hr", distance: 3.8 },
      // Retail
      { id: 105, name: "Memorial City Mall", type: "retail", pay: "$12-18/hr", distance: 3.2, hot: true },
      { id: 106, name: "Target Memorial", type: "retail", pay: "$15-18/hr", distance: 2.1, hot: true },
      { id: 107, name: "Kroger Memorial", type: "retail", pay: "$12-16/hr", distance: 1.8 },
      { id: 108, name: "AutoZone", type: "retail", pay: "$12-17/hr", distance: 2.4 },
      // Hotels
      { id: 109, name: "Four Points Sheraton", type: "hotel", pay: "$14-18/hr", distance: 1.8 },
      { id: 110, name: "Embassy Suites", type: "hotel", pay: "$13-17/hr", distance: 2.3 },
      // 🔧 TRADES
      { id: 111, name: "ABC Home & Commercial HVAC", type: "trades", pay: "$15-23/hr", distance: 5.5, hot: true },
      { id: 112, name: "Baker Hughes (Entry Level)", type: "trades", pay: "$18-26/hr", distance: 8.2, hot: true },
      { id: 113, name: "McCoy's Building Supply", type: "trades", pay: "$14-18/hr", distance: 6.1 },
      { id: 114, name: "Johnstone Supply HVAC", type: "trades", pay: "$13-17/hr", distance: 4.8 },
      // 🏗️ CONSTRUCTION
      { id: 115, name: "D.R. Horton (Framing)", type: "construction", pay: "$16-24/hr", distance: 6.5, hot: true },
      { id: 116, name: "Weekley Homes", type: "construction", pay: "$15-22/hr", distance: 7.8, hot: true },
      { id: 117, name: "Turner Construction", type: "construction", pay: "$17-25/hr", distance: 9.5 },
      { id: 118, name: "SpawGlass Concrete", type: "construction", pay: "$16-22/hr", distance: 8.2 },
      { id: 119, name: "BrandSafway Scaffolding", type: "construction", pay: "$15-21/hr", distance: 7.1, hot: true },
      { id: 120, name: "Painter's Union Local 79", type: "construction", pay: "$14-20/hr", distance: 5.8 },
      // 🚗 AUTO
      { id: 121, name: "Christian Brothers Auto", type: "auto", pay: "$13-20/hr", distance: 3.2 },
      { id: 122, name: "Caliber Collision", type: "auto", pay: "$14-22/hr", distance: 4.5, hot: true },
      { id: 123, name: "Jiffy Lube", type: "auto", pay: "$12-16/hr", distance: 2.1 },
      { id: 124, name: "Discount Tire", type: "auto", pay: "$13-18/hr", distance: 3.8, hot: true },
      // Warehouse & Labor
      { id: 125, name: "Amazon Warehouse", type: "warehouse", pay: "$15-19/hr", distance: 12 },
      { id: 126, name: "Floor & Decor", type: "warehouse", pay: "$14-18/hr", distance: 5.2 },
      { id: 127, name: "Ferguson Plumbing Supply", type: "warehouse", pay: "$14-19/hr", distance: 4.8 },
      { id: 128, name: "Two Men and a Truck", type: "warehouse", pay: "$14-20/hr", distance: 6.2, hot: true },
    ]
  };

  const jobTypes = [
    { id: 'all', label: 'All', icon: '🎯' },
    { id: 'construction', label: 'Build', icon: '🏗️' },
    { id: 'trades', label: 'Trades', icon: '🔧' },
    { id: 'auto', label: 'Auto', icon: '🚗' },
    { id: 'warehouse', label: 'Labor', icon: '📦' },
    { id: 'food', label: 'Food', icon: '🍔' },
    { id: 'retail', label: 'Retail', icon: '🛍️' },
    { id: 'hotel', label: 'Hotel', icon: '🏨' },
  ];

  // Marina Bay: $650, Lynbrook: $550 (just covering costs)
  const baseRent = selectedLocation === 'marina' ? 650 : 550;
  const RENT = hasRoommate ? Math.round(baseRent / 2) : baseRent;
  const UTILITIES = hasRoommate ? 75 : 150;

  const loc = locations[selectedLocation];
  const jobs = allJobs[selectedLocation];
  const filteredJobs = selectedJobType === 'all' ? jobs : jobs.filter(j => j.type === selectedJobType);

  const grossMonthly = (hourlyWage * hoursPerWeek * 52) / 12;
  const netMonthly = grossMonthly * 0.82; // ~18% taxes

  const totalExpenses = useMemo(() => {
    let total = RENT + UTILITIES + expenses.food + expenses.phone + expenses.entertainment + expenses.savings + expenses.other;
    if (hasCar) total += expenses.car + expenses.gas + expenses.carInsurance;
    return total;
  }, [RENT, UTILITIES, hasCar, expenses]);

  const remaining = netMonthly - totalExpenses;
  const isGood = remaining >= 100;
  const isTight = remaining >= 0 && remaining < 100;
  const isBad = remaining < 0;

  const tabs = [
    { id: 'budget', label: 'Budget', icon: '💰' },
    { id: 'jobs', label: 'Jobs', icon: '💼' },
    { id: 'location', label: 'Place', icon: '📍' },
    { id: 'learn', label: 'Tips', icon: '💡' },
  ];

  // Pill toggle component
  const PillToggle = ({ options, value, onChange, size = 'normal' }) => (
    <div className={`inline-flex bg-gray-800 rounded-full p-1 ${size === 'small' ? 'text-sm' : ''}`}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            value === opt.value
              ? 'bg-white text-gray-900 shadow-lg'
              : 'text-gray-400'
          } ${size === 'small' ? 'px-3 py-1.5 text-sm' : ''}`}
        >
          {opt.icon && <span className="mr-1">{opt.icon}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  );

  const ExpenseRow = ({ label, icon, value, onChange, max = 500 }) => (
    <div className="py-3 border-b border-gray-800">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300">{icon} {label}</span>
        <span className="font-bold text-cyan-400 text-lg">${value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={10}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-cyan-500"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Your Move 🎯
            </h1>
            
            {/* Location Toggle */}
            <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-full">
              <button
                onClick={() => setSelectedLocation('marina')}
                className={`p-2 rounded-full transition-all ${
                  selectedLocation === 'marina' ? 'bg-cyan-500 shadow-lg' : ''
                }`}
              >
                🌊
              </button>
              <button
                onClick={() => setSelectedLocation('sandy')}
                className={`p-2 rounded-full transition-all ${
                  selectedLocation === 'sandy' ? 'bg-orange-500 shadow-lg' : ''
                }`}
              >
                🏙️
              </button>
            </div>
          </div>
          
          {/* Quick Settings Bar */}
          <div className="flex items-center justify-between mt-3 text-sm">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setHasRoommate(!hasRoommate)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  hasRoommate ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {hasRoommate ? '👥 Roommate' : '🧍 Solo'}
              </button>
              <button 
                onClick={() => setHasCar(!hasCar)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  hasCar ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {hasCar ? '🚗 Car' : '🚶 No Car'}
              </button>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-cyan-400">${RENT}</span>
              <span className="text-gray-500">/mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4">
        
        {/* BUDGET TAB */}
        {activeTab === 'budget' && (
          <div className="space-y-4">
            
            {/* Quick context */}
            <div className="text-center py-2">
              <p className="text-gray-500 text-sm">
                Can you afford to move out? Let's find out 👇
              </p>
            </div>
            
            {/* Income Card */}
            <div className="bg-gray-900 rounded-2xl p-4">
              <h2 className="font-bold text-lg mb-4">💵 Your Income</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Hourly Wage</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl text-gray-400">$</span>
                    <input
                      type="number"
                      value={hourlyWage}
                      onChange={(e) => setHourlyWage(Math.max(7.25, parseFloat(e.target.value) || 0))}
                      className="bg-gray-800 rounded-xl px-4 py-3 text-2xl font-bold w-20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <span className="text-gray-400">/hr</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Hours/Week</span>
                    <span className="font-bold text-cyan-400">{hoursPerWeek} hrs</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-800 rounded-xl p-3 text-center">
                  <div className="text-gray-400 text-xs">Gross</div>
                  <div className="text-xl font-bold">${grossMonthly.toFixed(0)}</div>
                </div>
                <div className="bg-green-500/20 rounded-xl p-3 text-center border border-green-500/30">
                  <div className="text-green-400 text-xs">Take Home</div>
                  <div className="text-xl font-bold text-green-400">${netMonthly.toFixed(0)}</div>
                </div>
              </div>
            </div>

            {/* Expenses Card */}
            <div className="bg-gray-900 rounded-2xl p-4">
              <h2 className="font-bold text-lg mb-2">📊 Expenses</h2>
              
              {/* Fixed costs */}
              <div className="py-3 border-b border-gray-800 flex justify-between">
                <span className="text-gray-300">🏠 Rent</span>
                <span className="font-bold">${RENT}</span>
              </div>
              <div className="py-3 border-b border-gray-800 flex justify-between">
                <span className="text-gray-300">💡 Utilities</span>
                <span className="font-bold">${UTILITIES}</span>
              </div>
              
              {/* Adjustable expenses */}
              <ExpenseRow label="Food" icon="🍔" value={expenses.food} onChange={(v) => setExpenses({...expenses, food: v})} max={600} />
              <ExpenseRow label="Phone" icon="📱" value={expenses.phone} onChange={(v) => setExpenses({...expenses, phone: v})} max={150} />
              <ExpenseRow label="Fun" icon="🎮" value={expenses.entertainment} onChange={(v) => setExpenses({...expenses, entertainment: v})} max={300} />
              
              {hasCar && (
                <>
                  <ExpenseRow label="Car Payment" icon="🚗" value={expenses.car} onChange={(v) => setExpenses({...expenses, car: v})} max={500} />
                  <ExpenseRow label="Gas" icon="⛽" value={expenses.gas} onChange={(v) => setExpenses({...expenses, gas: v})} max={300} />
                  <ExpenseRow label="Car Insurance" icon="🛡️" value={expenses.carInsurance} onChange={(v) => setExpenses({...expenses, carInsurance: v})} max={300} />
                </>
              )}
              
              <ExpenseRow label="Savings" icon="🐷" value={expenses.savings} onChange={(v) => setExpenses({...expenses, savings: v})} max={400} />
            </div>

            {/* The Verdict */}
            <div className={`rounded-2xl p-5 ${
              isGood ? 'bg-green-500/20 border-2 border-green-500/50' :
              isTight ? 'bg-yellow-500/20 border-2 border-yellow-500/50' :
              'bg-red-500/20 border-2 border-red-500/50'
            }`}>
              <div className="text-center mb-4">
                <span className={`text-4xl font-black ${
                  isGood ? 'text-green-400' : isTight ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {remaining >= 0 ? '+' : ''}${remaining.toFixed(0)}
                </span>
                <p className="text-sm text-gray-400 mt-1">left over each month</p>
              </div>
              
              <div className="text-center mb-4">
                <span className="font-bold text-lg">
                  {isGood ? '✅ You can do this!' : isTight ? '⚠️ Tight but possible' : '🚨 Not quite there yet'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-black/20 rounded-xl p-3">
                  <div className="text-xs text-gray-400">You make</div>
                  <div className="font-bold text-green-400 text-lg">${netMonthly.toFixed(0)}</div>
                </div>
                <div className="bg-black/20 rounded-xl p-3">
                  <div className="text-xs text-gray-400">You spend</div>
                  <div className="font-bold text-red-400 text-lg">${totalExpenses}</div>
                </div>
              </div>
              
              {isBad && (
                <div className="mt-4 p-3 bg-black/20 rounded-xl">
                  <p className="text-sm text-red-200 font-medium">💡 Try:</p>
                  <ul className="text-sm text-gray-300 mt-1 space-y-1">
                    <li>• More hours (you're at {hoursPerWeek}/week)</li>
                    <li>• Higher paying job (construction pays $16-24/hr)</li>
                    <li>• Get a roommate (cuts rent to $325)</li>
                    <li>• Cut some expenses above</li>
                  </ul>
                </div>
              )}
              
              {isTight && (
                <p className="text-sm mt-3 text-yellow-200 text-center">
                  You'll make it, but no room for surprises. Build that emergency fund!
                </p>
              )}
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            
            {/* Header */}
            <div className={`rounded-2xl p-4 ${
              selectedLocation === 'marina' ? 'bg-cyan-500/20' : 'bg-orange-500/20'
            }`}>
              <h2 className="font-bold text-lg">{loc.emoji} Jobs Near {loc.name}</h2>
              <p className="text-gray-400 text-sm mt-1">{loc.vibe}</p>
              <p className="text-xs text-gray-500 mt-2">
                🏗️ Construction & trades jobs at the top — good pay, real skills.
              </p>
            </div>

            {/* Job Type Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
              {jobTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedJobType(type.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all ${
                    selectedJobType === type.id
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {type.icon} {type.label}
                </button>
              ))}
            </div>

            {/* Visual Distance Map */}
            <div className="bg-gray-900 rounded-2xl p-4">
              <h3 className="font-bold mb-3">🗺️ Distance Map</h3>
              <p className="text-xs text-gray-500 mb-4">Tap jobs below to see details</p>
              
              <div className="relative h-64 flex items-center justify-center">
                {/* Distance rings */}
                {[3, 6, 10].map((dist) => (
                  <div
                    key={dist}
                    className="absolute rounded-full border border-gray-700 border-dashed"
                    style={{
                      width: `${(dist / 10) * 80}%`,
                      height: `${(dist / 10) * 80}%`,
                    }}
                  >
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs text-gray-600 bg-gray-900 px-1">
                      {dist}mi
                    </span>
                  </div>
                ))}
                
                {/* Home pin */}
                <div className="absolute w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center z-20 shadow-lg shadow-cyan-500/50 border-2 border-white">
                  🏠
                </div>
                
                {/* Job pins */}
                {filteredJobs.slice(0, 12).map((job, i) => {
                  const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
                  const radius = Math.min(job.distance / 12, 1) * 42;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  const colors = {
                    food: 'bg-orange-500',
                    retail: 'bg-pink-500',
                    entertainment: 'bg-purple-500',
                    hotel: 'bg-blue-500',
                    warehouse: 'bg-amber-600',
                    construction: 'bg-yellow-500',
                    trades: 'bg-emerald-500',
                    auto: 'bg-red-500',
                  };
                  const icons = { 
                    food: '🍔', retail: '🛍️', entertainment: '🎢', hotel: '🏨', warehouse: '📦',
                    construction: '🏗️', trades: '🔧', auto: '🚗'
                  };
                  
                  return (
                    <div
                      key={job.id}
                      className={`absolute w-9 h-9 ${colors[job.type] || 'bg-gray-500'} rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 transition-transform active:scale-125 ${job.hot ? 'animate-pulse' : ''}`}
                      style={{
                        left: `calc(50% + ${x}%)`,
                        top: `calc(50% + ${y}%)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {icons[job.type] || '💼'}
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-2 mt-4 pt-3 border-t border-gray-800 text-xs">
                <span className="bg-yellow-500/20 px-2 py-1 rounded-full">🏗️ Build</span>
                <span className="bg-emerald-500/20 px-2 py-1 rounded-full">🔧 Trades</span>
                <span className="bg-red-500/20 px-2 py-1 rounded-full">🚗 Auto</span>
                <span className="bg-amber-600/20 px-2 py-1 rounded-full">📦 Labor</span>
                <span className="bg-orange-500/20 px-2 py-1 rounded-full">🍔 Food</span>
                <span className="bg-pink-500/20 px-2 py-1 rounded-full">🛍️ Retail</span>
              </div>
            </div>

            {/* Job List */}
            <div className="space-y-3">
              <p className="text-xs text-gray-500 px-1">🔥 = actively hiring now</p>
              {filteredJobs.map(job => {
                const icons = { 
                  food: '🍔', retail: '🛍️', entertainment: '🎢', hotel: '🏨', warehouse: '📦',
                  construction: '🏗️', trades: '🔧', auto: '🚗'
                };
                return (
                  <div key={job.id} className="bg-gray-900 rounded-xl p-4 active:bg-gray-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{icons[job.type] || '💼'}</span>
                          <span className="font-bold">{job.name}</span>
                          {job.hot && <span className="text-xs bg-red-500 px-2 py-0.5 rounded-full">🔥 Hiring</span>}
                        </div>
                        <div className="text-sm text-gray-400 mt-1 ml-7">
                          {job.distance} miles {!hasCar && job.distance > 5 && <span className="text-yellow-500">(far w/o car)</span>}
                        </div>
                      </div>
                      <div className="text-green-400 font-bold text-lg">{job.pay}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LOCATION TAB */}
        {activeTab === 'location' && (
          <div className="space-y-4">
            
            {/* The Deal Breakdown - Location Specific */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">🤝 The Family Deal</h3>
                <span className="text-xs bg-green-500/30 text-green-300 px-2 py-1 rounded-full">
                  {selectedLocation === 'marina' ? 'We cover the gap' : 'Fair deal'}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Real talk: here's what this place actually costs us each month.
              </p>
              
              {selectedLocation === 'marina' ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>HOA fees</span>
                    <span>$545/mo</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Property taxes</span>
                    <span>$237/mo</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Insurance</span>
                    <span>$88/mo</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-700 text-gray-300">
                    <span>Our actual cost</span>
                    <span className="text-red-400 font-medium">$870/mo</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-green-500/30 font-bold text-lg">
                    <span>What you pay</span>
                    <span className="text-green-400">${RENT}/mo</span>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-2 mt-2">
                    <p className="text-green-300 text-xs text-center">
                      We're covering $220/mo so you can get started 💪
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>HOA fees</span>
                    <span>$361/mo</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Property taxes</span>
                    <span>$153/mo</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Insurance</span>
                    <span>$53/mo</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-700 text-gray-300">
                    <span>Our actual cost</span>
                    <span className="text-yellow-400 font-medium">$567/mo</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-green-500/30 font-bold text-lg">
                    <span>What you pay</span>
                    <span className="text-green-400">${RENT}/mo</span>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-2 mt-2">
                    <p className="text-green-300 text-xs text-center">
                      Just covering our costs here — fair deal for everyone 🤝
                    </p>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-3 italic">
                Market rent: ${selectedLocation === 'marina' ? '900-1,100' : '700-900'}/mo. 
                This is how life works — know your real costs.
              </p>
            </div>

            {/* Location Cards */}
            {Object.entries(locations).map(([key, loc]) => (
              <button
                key={key}
                onClick={() => setSelectedLocation(key)}
                className={`w-full text-left bg-gray-900 rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedLocation === key
                    ? key === 'marina' ? 'border-cyan-500' : 'border-orange-500'
                    : 'border-gray-800'
                }`}
              >
                <div className={`p-4 ${key === 'marina' ? 'bg-cyan-500/20' : 'bg-orange-500/20'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{loc.emoji}</span>
                      <div>
                        <h3 className="font-bold text-lg">{loc.name}</h3>
                        <p className="text-sm text-gray-400">{loc.area}</p>
                      </div>
                    </div>
                    {selectedLocation === key && (
                      <span className="bg-white/20 px-2 py-1 rounded-full text-xs">✓ Selected</span>
                    )}
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your rent</span>
                    <span className="text-green-400 font-bold">$650/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transit</span>
                    <span className={key === 'marina' ? 'text-yellow-400' : 'text-green-400'}>
                      {loc.transit}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 pt-2">{loc.vibe}</p>
                </div>
              </button>
            ))}

            {/* Nearby Places */}
            <div className="bg-gray-900 rounded-2xl p-4">
              <h3 className="font-bold mb-3">📍 What's Nearby</h3>
              
              {selectedLocation === 'marina' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 rounded-xl p-3 text-center">
                    <div className="text-2xl">🎢</div>
                    <div className="font-medium text-sm mt-1">Kemah Boardwalk</div>
                    <div className="text-xs text-gray-500">2.5 mi</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-3 text-center">
                    <div className="text-2xl">🚀</div>
                    <div className="font-medium text-sm mt-1">NASA Center</div>
                    <div className="text-xs text-gray-500">5 mi</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-3 text-center">
                    <div className="text-2xl">🛍️</div>
                    <div className="font-medium text-sm mt-1">Baybrook Mall</div>
                    <div className="text-xs text-gray-500">8 mi</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-3 text-center">
                    <div className="text-2xl">🏖️</div>
                    <div className="font-medium text-sm mt-1">Galveston</div>
                    <div className="text-xs text-gray-500">25 mi</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 rounded-xl p-3 text-center">
                    <div className="text-2xl">🛍️</div>
                    <div className="font-medium text-sm mt-1">Memorial City</div>
                    <div className="text-xs text-gray-500">3 mi</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-3 text-center">
                    <div className="text-2xl">🎯</div>
                    <div className="font-medium text-sm mt-1">Target</div>
                    <div className="text-xs text-gray-500">2 mi</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-3 text-center">
                    <div className="text-2xl">🏢</div>
                    <div className="font-medium text-sm mt-1">City Centre</div>
                    <div className="text-xs text-gray-500">4 mi</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-3 text-center">
                    <div className="text-2xl">🏛️</div>
                    <div className="font-medium text-sm mt-1">Downtown</div>
                    <div className="text-xs text-gray-500">12 mi</div>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Map */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden">
              <div className="p-3 border-b border-gray-800">
                <h3 className="font-bold text-sm">🗺️ See the Area</h3>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={selectedLocation === 'marina'
                    ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13876.241726067012!2d-95.04383!3d29.5553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x863f62a3adfc7a9d%3A0x5a2e4e2ed5b8f0e!2sMarina%20Bay%20Condominiums!5e0!3m2!1sen!2sus!4v1705600000000!5m2!1sen!2sus"
                    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13843.123456789012!2d-95.5580!3d29.7580!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c3d23a8b5555%3A0x1234567890abcdef!2s11201%20Lynbrook%20Dr%2C%20Houston%2C%20TX%2077042!5e0!3m2!1sen!2sus!4v1705600000000!5m2!1sen!2sus"
                  }
                />
              </div>
            </div>

            {/* Map Link */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedLocation === 'marina'
                  ? '4011 NASA Parkway Seabrook TX 77586'
                  : '11201 Lynbrook Dr Houston TX 77042'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-cyan-500 text-white font-bold text-center py-4 rounded-2xl active:bg-cyan-600"
            >
              🗺️ Open in Google Maps
            </a>
          </div>
        )}

        {/* LEARN TAB */}
        {activeTab === 'learn' && (
          <div className="space-y-4">
            
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl p-4 border border-cyan-500/30">
              <h2 className="font-bold text-lg">💡 Money Tips</h2>
              <p className="text-gray-400 text-sm mt-1">Stuff we learned so you don't have to</p>
            </div>

            {[
              {
                title: "Your paycheck is a lie",
                icon: "💸",
                text: `$${hourlyWage}/hr becomes ~$${(hourlyWage * 0.82).toFixed(2)}/hr after taxes. That $${grossMonthly.toFixed(0)} gross = $${netMonthly.toFixed(0)} actual.`,
              },
              {
                title: "The 30% rent rule",
                icon: "🏠",
                text: `Rent should be ≤30% of take-home. At $${netMonthly.toFixed(0)}/mo, max rent is $${(netMonthly * 0.3).toFixed(0)}. Your $${RENT} is ${((RENT/netMonthly)*100).toFixed(0)}%.`,
              },
              {
                title: "$5/day = $1,800/year",
                icon: "☕",
                text: "Random snacks, drinks, impulse buys add up. Pack lunch, make coffee at home.",
              },
              {
                title: "Credit cards are traps",
                icon: "💳",
                text: "24% APR means $1,000 balance costs $240/year in interest. Pay in full or don't use it.",
              },
              {
                title: "Pay yourself first",
                icon: "🐷",
                text: "Move savings BEFORE you spend. Even $25/paycheck = $650/year.",
              },
              {
                title: "Cars eat money",
                icon: "🚗",
                text: hasCar 
                  ? `Payment + gas + insurance = $${expenses.car + expenses.gas + expenses.carInsurance}/mo = $${(expenses.car + expenses.gas + expenses.carInsurance) * 12}/year.`
                  : "Smart move skipping the car. That's $300-500/mo saved.",
              },
            ].map((tip, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{tip.icon}</span>
                  <h3 className="font-bold">{tip.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{tip.text}</p>
              </div>
            ))}

            {/* Move-in costs */}
            <div className="bg-gray-900 rounded-2xl p-4">
              <h3 className="font-bold mb-3">🚀 Day One Costs</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>First month rent</span><span>${RENT}</span></div>
                <div className="flex justify-between"><span>Security deposit</span><span>${RENT}</span></div>
                <div className="flex justify-between"><span>Utility deposits</span><span>$200</span></div>
                <div className="flex justify-between"><span>Groceries & supplies</span><span>$250</span></div>
                <div className="flex justify-between"><span>Buffer for surprises</span><span>$200</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-800 mt-2">
                  <span>Total needed</span>
                  <span className="text-purple-400">${RENT * 2 + 650}</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-gray-900 rounded-2xl p-4">
              <h3 className="font-bold mb-3">✅ Adulting Checklist</h3>
              <div className="space-y-2">
                {[
                  "Open checking + savings accounts",
                  "Set up direct deposit",
                  "Track spending for 1 month",
                  "Build $1,000 emergency fund",
                  "Learn 5 cheap meals to cook",
                  "Get renters insurance (~$15/mo)",
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-3 p-2 active:bg-gray-800 rounded-lg cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 accent-cyan-500 rounded" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Uncle Credit */}
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm">
                Built with 💜 by
              </p>
              <p className="text-gray-400 font-medium mt-1">
                Uncle Mikey & Uncle Constantine
              </p>
              <p className="text-gray-600 text-xs mt-2">
                We believe in you. Now go make it happen. 🚀
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur border-t border-gray-800 z-40">
        <div className="flex justify-around py-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'text-cyan-400'
                  : 'text-gray-500'
              }`}
            >
              <span className={`text-2xl mb-1 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                {tab.icon}
              </span>
              <span className="text-xs font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1" />
              )}
            </button>
          ))}
        </div>
        {/* Safe area for phones with home indicator */}
        <div className="h-safe-area-inset-bottom bg-gray-900" />
      </div>
    </div>
  );
}
