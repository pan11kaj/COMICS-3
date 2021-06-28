AFRAME.registerComponent("store", {
  schema:{
    state:{type:"string",default:"places-list"},
    selectedCard:{type:"string",default:"#card1"},
    zoomAspectRatio:{type:"number",default:1}
  },
    init: function () {
      this.placesContainer = this.el;
      this.createCards();
    },
  
    createCards: function () {
      const thumbNailsRef =[
        {
            id:"magzine",
            title:"Magzine",
            url:'/images/magazine.jpg'
        },
        {
            id:"misty",
            title:"Misty Buster",
            url:'/images/mistybuster.jpg'
        },
        {
            id:"spiderman",
            title:"Spider Man",
            url:'/images/spiderman.jpg'
        },
        {
            id:"xmen",
            title:"X-MEN",
            url:'/images/xmen.jpg'
        }
    ];
      let prevoiusXPosition = -60;
  
      for (var item of thumbNailsRef) {
        const posX = prevoiusXPosition + 25;
        const posY = 10;
        const posZ = -40;
        const position = { x: posX, y: posY, z: posZ };
        prevoiusXPosition = posX;
        const borderEl = this.createBorder(position, item.id);
        const thumbNail = this.createThumbNail(item);
        borderEl.appendChild(thumbNail);
        const titleEl = this.createTitleEl(position, item);
        borderEl.appendChild(titleEl);
        this.placesContainer.appendChild(borderEl);
      }
    },
    createBorder: function (position, id) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("id", id);
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("geometry", {
        primitive: "ring",
        radiusInner: 9,
        radiusOuter: 10,
      });
      entityEl.setAttribute("position", position);
      entityEl.setAttribute("material", {
        color: "orange",
        opacity: 1,
      });
      entityEl.setAttribute("mycursor",{});
      return entityEl;
    },
    createThumbNail: function (item) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("geometry", {
        primitive: "circle",
        radius: 9,
      });
      entityEl.setAttribute("material", { src: item.url });
      return entityEl;
    },
    createTitleEl: function (position, item) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("text", {
        font: "exo2bold",
        align: "center",
        width: 70,
        color: "#e65100",
        value: item.title,
      });
      const elPosition = position;
      elPosition.y = -20;
      entityEl.setAttribute("position", elPosition);
      entityEl.setAttribute("visible", true);
      
      return entityEl;
    },
    hideEl: function(ElList){
      ElList.map(el=>{
        el.setAttribute("visible",false);
      });
    },
    showView: function(){
      const {selectedCard} = this.data;
      const box = document.querySelector("#box");
      box.setAttribute("material",{src:`/comics/${selectedCard}.jpg`,color:"#fff"});
      box.setAttribute("visible",true);
    },
    tick: function(){
      const {state} = this.el.getAttribute("store");
      if(state === "view"){
      this.hideEl([this.placesContainer]);
      this.showView();
    }
    }
  });
  
