function VaataArvuteid() {
    
    const margid =  localStorage.getItem("margid");
    const mudelid =  localStorage.getItem("mudelid");
    const maksumused =  localStorage.getItem("maksumused");
    
    return (<div className="small-text">
        Margid: {margid} <br />
        Mudelid: {mudelid} <br />
        Hinnad: {maksumused}
    </div>)
}

export default VaataArvuteid;