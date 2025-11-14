export function PerryAvatar({ color = 'teal', size = 200 }) {
  // Color mapping
  const colors = {
    teal: '#16A4A4',
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    purple: '#9D00FF',
    yellow: '#FFFF00',
    orange: '#FF8C00',
    pink: '#FF69B4',
    cyan: '#00FFFF',
    lime: '#32CD32',
    magenta: '#FF00FF',
    brown: '#8B4513'
  }

  const bodyColor = colors[color] || colors.teal
  const gold = '#FFB732'
  const hatBrown = '#5C4033'
  const eyeWhite = '#FFFFFF'
  const eyeBlue = '#3498DB'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="platypus-svg"
    >
      {/* Body - Dynamic Color */}
      <ellipse cx="100" cy="120" rx="35" ry="50" fill={bodyColor} stroke="#000" strokeWidth="3"/>
      
      {/* Head */}
      <ellipse cx="100" cy="70" rx="28" ry="30" fill={bodyColor} stroke="#000" strokeWidth="3"/>
      
      {/* Arms */}
      <ellipse cx="75" cy="110" rx="12" ry="20" fill={bodyColor} stroke="#000" strokeWidth="2.5" transform="rotate(-20 75 110)"/>
      <ellipse cx="125" cy="110" rx="12" ry="20" fill={bodyColor} stroke="#000" strokeWidth="2.5" transform="rotate(20 125 110)"/>
      
      {/* Tail - GOLD */}
      <path d="M 100 165 Q 110 180, 120 175 Q 130 170, 125 160 Q 120 150, 110 155 Z" 
            fill={gold} stroke="#000" strokeWidth="2.5"/>
      
      {/* Beak - GOLD */}
      <ellipse cx="100" cy="75" rx="35" ry="12" fill={gold} stroke="#000" strokeWidth="2.5"/>
      <line x1="65" y1="75" x2="135" y2="75" stroke="#000" strokeWidth="2"/>
      
      {/* Feet - GOLD */}
      <ellipse cx="90" cy="170" rx="15" ry="8" fill={gold} stroke="#000" strokeWidth="2.5"/>
      <ellipse cx="110" cy="170" rx="15" ry="8" fill={gold} stroke="#000" strokeWidth="2.5"/>
      
      {/* Webbed feet details */}
      <line x1="80" y1="170" x2="75" y2="173" stroke="#000" strokeWidth="2"/>
      <line x1="85" y1="170" x2="82" y2="174" stroke="#000" strokeWidth="2"/>
      <line x1="95" y1="170" x2="95" y2="175" stroke="#000" strokeWidth="2"/>
      <line x1="105" y1="170" x2="105" y2="175" stroke="#000" strokeWidth="2"/>
      <line x1="115" y1="170" x2="118" y2="174" stroke="#000" strokeWidth="2"/>
      <line x1="120" y1="170" x2="125" y2="173" stroke="#000" strokeWidth="2"/>
      
      {/* Hat - BROWN */}
      <ellipse cx="100" cy="45" rx="32" ry="8" fill={hatBrown} stroke="#000" strokeWidth="2.5"/>
      <path d="M 75 45 Q 75 25, 90 20 L 110 20 Q 125 25, 125 45 Z" 
            fill={hatBrown} stroke="#000" strokeWidth="2.5"/>
      <rect x="85" y="38" width="30" height="7" fill={hatBrown} stroke="#000" strokeWidth="2"/>
      
      {/* Eyes */}
      <ellipse cx="92" cy="68" rx="8" ry="10" fill={eyeWhite} stroke="#000" strokeWidth="2"/>
      <ellipse cx="108" cy="68" rx="8" ry="10" fill={eyeWhite} stroke="#000" strokeWidth="2"/>
      <circle cx="93" cy="70" r="4" fill={eyeBlue}/>
      <circle cx="109" cy="70" r="4" fill={eyeBlue}/>
      <circle cx="94" cy="69" r="2" fill="#000"/>
      <circle cx="110" cy="69" r="2" fill="#000"/>
    </svg>
  )
}
