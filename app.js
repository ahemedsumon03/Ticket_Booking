let app = Vue.createApp({
    data()
    {
        return{
            confirmed:false,
            name:'',
            mobile:'',
            couponCode:'',
            appliedCoupon:null,
            coupons: [
                {
                    code: "100TAKAOFF",
                    discount: 100
                },
                {
                    code: "200TAKAOFF",
                    discount: 200
                }
            ],
            seatStates: {
                sold: {
                    text: "Sold",
                    color: "#ff0000"
                },
                available: {
                    text: "Available",
                    color: "#fff"
                },
                booked: {
                    text: "Booked",
                    color: "gray"
                },
                selected: {
                    text: "Selected",
                    color: "#00ff00"
                }
            },
            seats: [
                {
                    name: "A1",
                    type: "available",
                    price: 500
                },
                {
                    name: "A2",
                    type: "available",
                    price: 500
                },
                {
                    name: "A3",
                    type: "available",
                    price: 500
                },
                {
                    name: "A4",
                    type: "available",
                    price: 500
                },
                {
                    name: "B1",
                    type: "available",
                    price: 450
                },
                {
                    name: "B2",
                    type: "available",
                    price: 450
                },
                {
                    name: "B3",
                    type: "available",
                    price: 450
                },
                {
                    name: "B4",
                    type: "available",
                    price: 450
                },
                {
                    name: "C1",
                    type: "sold",
                    price: 500
                },
                {
                    name: "C2",
                    type: "sold",
                    price: 500
                },
                {
                    name: "C3",
                    type: "sold",
                    price: 500
                },
                {
                    name: "C4",
                    type: "sold",
                    price: 500
                },
                {
                    name: "D1",
                    type: "available",
                    price: 400
                },
                {
                    name: "D2",
                    type: "available",
                    price: 400
                },
                {
                    name: "D3",
                    type: "available",
                    price: 400
                },
                {
                    name: "D4",
                    type: "available",
                    price: 400
                },
                {
                    name: "E1",
                    type: "available",
                    price: 300
                },
                {
                    name: "E2",
                    type: "available",
                    price: 300
                },
                {
                    name: "E3",
                    type: "booked",
                    price: 300
                },
                {
                    name: "E4",
                    type: "booked",
                    price: 300
                },
                {
                    name: "F1",
                    type: "available",
                    price: 300
                },
                {
                    name: "F2",
                    type: "available",
                    price: 300
                },
                {
                    name: "F3",
                    type: "available",
                    price: 300
                },
                {
                    name: "F4",
                    type: "available",
                    price: 300
                }
            ]
        }
    },

    methods:{
        handlerClick(i)
        {
            let clickedItem = this.seats[i];

            if(clickedItem.type === 'sold' || clickedItem.type === 'booked')
            {
                alert('You can not select this seat');
                return;
            }

            if(clickedItem.type === 'available' && this.SelectedItem.length > 2)
            {
                alert('You can not select more than 3 seat');
                return;
            }

            if(clickedItem.type === 'selected')
            {
                clickedItem.type = 'available'
            }else {
                clickedItem.type = 'selected'
            }
        },
        confirm()
        {
            if(this.name.length === 0)
            {
                alert('Name is empty');
                return;
            }
            else if(this.mobile.length === 0)
            {
                alert('Mobile is empty');
                return;
            }

            this.confirmed = true;
        },
        resetData()
        {
            this.confirmed = false;
            this.name = "";
            this.mobile = "";
            this.appliedCoupon = null;

            this.seats.forEach(seat=>{
                if(seat.type === 'selected')
                {
                    seat.type = 'sold';
                }
            })
        }
    },
    computed:{
        SelectedItem()
        {
            let selectSeat = this.seats.filter(item=>item.type === 'selected');
            return selectSeat;
        },
        TotalTaka()
        {
            let tc = 0;
            this.SelectedItem.forEach((seat)=>{
                tc = tc + seat.price;
            });

            if(this.appliedCoupon!== null)
            {
                tc = tc- this.appliedCoupon.discount;
            }

            return tc;
        },
    },
    watch:{
        couponCode(newValue)
        {
            if(newValue.length === 10)
            {
                let SearchCoupon = this.coupons.filter((item)=>item.code === newValue);
                if(SearchCoupon.length === 1)
                {
                    this.appliedCoupon = SearchCoupon[0];
                    this.couponCode = "";
                }
            }
        }
    }
});

app.mount('#main');