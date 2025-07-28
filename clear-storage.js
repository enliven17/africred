// LocalStorage temizleme scripti
// Bu dosyayı browser console'da çalıştırın

console.log('Clearing localStorage...');
localStorage.clear();
console.log('LocalStorage cleared successfully!');

// Yeni demo data ekle
const demoProgress = {
  1: {
    missionId: '1',
    missionTitle: 'Mathematics Fundamentals',
    score: 85,
    maxScore: 100,
    completed: true,
    issuedAt: new Date().toISOString()
  },
  2: {
    missionId: '2',
    missionTitle: 'Blockchain Basics',
    score: 92,
    maxScore: 100,
    completed: true,
    issuedAt: new Date().toISOString()
  },
  3: {
    missionId: '3',
    missionTitle: 'Smart Contract Development',
    score: 78,
    maxScore: 100,
    completed: false,
    issuedAt: null
  }
};

localStorage.setItem('africred_progress', JSON.stringify(demoProgress));
console.log('Demo progress data added!');
console.log('Please refresh the page to see the changes.'); 