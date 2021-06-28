AFRAME.registerComponent('mycursor', {
    schema: {
        selectItemId:{default:'',type:"string"},

    },

    init: function () {
        this.handleMouseLeaveEvents();
        this.handleMouseEnterEvents();
        this.handleClickEvent();
    },
    handlePlaceListState: function(){
        const id = this.el.getAttribute("id");
        const placesId = ["magzine","misty","spiderman","xmen"];
        if (placesId.includes(id)) {
            const container = document.querySelector("#container");
            container.setAttribute("mycursor",{ selectItemId:id});
            this.el.setAttribute("material",{
            color:"red",
            opacity:1
        });
        console.log(id);
        }
    },
    handleMouseEnterEvents: function(){
        this.el.addEventListener("mouseenter",()=>{
            this.handlePlaceListState();
        });
    },
    handleMouseLeaveEvents: function(){
        this.el.addEventListener("mouseleave",()=>{
            const {selectItemId} = this.data;
            if(selectItemId){
                const el = document.querySelector(`#${selectItemId}`);
                const id = el.getAttribute("id");
                if(id === selectItemId){
                    el.setAttribute("material",{
                        color:"orange",
                        opacity:1
                    });
                    
                }
            }
        })
    },
    remove: function () {
      // Do something the component or its entity is detached.
    },
    handleClickEvent:function(){
        this.el.addEventListener("click",event=>{
            const placeContainer = document.querySelector("#container");
            const {state} = placeContainer.getAttribute("store");
            if(state === "places-list"){
                const id = this.el.getAttribute("id");
                const placesId = ["magzine","xmen","spiderman","misty"];
                if(placesId.includes(id)){
                    placeContainer.setAttribute("store",{state:"view",selectedCard:id});                    
                }
            }
        })
    },
    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});
