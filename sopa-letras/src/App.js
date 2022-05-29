import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import "./assets/styles/app.css"
import GameTable from './components/game-table/game-table.component';

function App() {

  return (
    <div id="container">
      <Header />
      <main className="main-content">
        <GameTable />
      </main>
      <Footer />
    </div>
  );
}

export default App;
