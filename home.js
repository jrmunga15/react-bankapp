function Home(){
    return (
      <Card
        bgcolor="blue"
        header="BadBank Landing Page"
        title="Taking Care of Your Money"
        text="You can move around using the navigation bar."
        body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
      />    
    );  
  }