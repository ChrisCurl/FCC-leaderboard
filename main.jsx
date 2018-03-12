
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      display: 'allTime',
      allTimeError: null,
      recentError: null,
      isLoadedAllTime: false,
      isLoadedRecent: false,
      allTimeData: [],
      recentData: [],
    }
    this.getAllTime = this.getAllTime.bind(this);
    this.getRecent = this.getRecent.bind(this);
    this.setAllTime = this.setAllTime.bind(this);
    this.setRecent = this.setRecent.bind(this);
  };
  componentWillMount(){
    document.body.classList.add('colorFade');
  }
  componentWillUnmount(){
    document.body.classList.remove('colorFade');
  }
  componentDidMount(){
    //get Recent Data
      fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
        .then( res => res.json())
          .then(
            (result) => {
              this.setState({
                recentData: result,
                isLoadedRecent: true
                });
            }, (error) => {
              this.setState({
                isLoadedRecent: true,
                recentError: error
              });
            }
      ) 
    //get All Time data
      fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
        .then( res => res.json())
          .then(
            (result) => {
              this.setState({
                allTimeData: result,
                isLoadedAllTime: true,
                });
            }, (error) => {
              this.setState({
                isLoadedAllTime: true,
                recentError: error
              });
            }
      )
  }
  
  getRecent(props) {
    let counter = 0;
    return this.state.recentData.map(function(item){
      counter++;
      return <tr key = {item.username} className = {(counter % 2 != 0) ? 'light' : 'dark'}>
               <td className = 'tdCenter'>{counter}</td>
               <td className = 'imgTd'><img src={item.img} className = 'avatar' /><span className = 'centerP'>{item.username}</span></td>
               <td className = 'tdCenter'>{item.recent}</td>
               <td className = 'tdCenter'>{item.alltime}</td> 
             </tr>
    })
  }
  
  
  getAllTime() {
    let counter = 0;
    return this.state.allTimeData.map(function(item) {
      counter++;
      return <tr key = {item.username} className = {(counter % 2 != 0) ? 'light' : 'dark' }>
        <td className = 'tdCenter'>{counter}</td>
        <td className = 'imgTd'><img src={item.img} className = 'avatar' /><span className = 'centerP'>{item.username}</span></td>
        <td className = 'tdCenter'>{item.recent}</td>
        <td className = 'tdCenter'>{item.alltime}</td>
        </tr>
    })
  }
  
  setAllTime() {
    this.setState({display: "allTime"});
  }
  
  setRecent() {
    this.setState({display: 'recent'});
  }
   
                                  

  render() {
    return (
      <div className = 'container'>
        <div className = 'heading'>
          <h1>LeaderBoard<a href = 'http://freecodecamp.org' ><i className = 'fab fa-free-code-camp'></i></a></h1>
        </div>
        <table>
          <tr><th>Rank</th><th>Camper</th><th onClick = {this.setRecent}><a href = '#'>Points (30 days)</a></th><th onClick = {this.setAllTime}><a href='#'>Points (all time)</a></th></tr>
          {(this.state.display === 'allTime') ? this.getAllTime() : this.getRecent()}
        </table>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

                     
