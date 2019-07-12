// App = {
//   web3Provider: null,
//   contracts: {},
  

//   init: function() {
//     console.log("App initialized...")
//     return App.initWeb3();
//   },

//   initWeb3: function() {
//     if (typeof web3 !== 'undefined') {
//       // If a web3 instance is already provided by Meta Mask.
//       App.web3Provider = web3.currentProvider;
//       web3 = new Web3(web3.currentProvider);
//     } else {
//       // Specify default instance if no web3 instance provided
//       App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
//       web3 = new Web3(App.web3Provider);
//     }
//     return App.initContracts();
//   },

//   initContracts: function() {
//     $.getJSON("Signup.json", function(signup) {
//       App.contracts.Signup = TruffleContract(signup);
//       App.contracts.Signup.setProvider(App.web3Provider);
//       App.contracts.Signup.deployed().then(function(err ,instance) {
//         var accounts = web3.eth.getAccounts();
//          var i;
//          var name = $('').val();
//          var password = $('').val();
//               for (i = 0; i <= accounts; i++) { 
//                 i=i+1;
//                 instance.createUser(accounts[i],name,password);
//                 if(err===null){
//                   break;
//                 }
//                var a  = accounts[i]
//              }
//              var accountAddress = a;
//              $('').html(  accountAddress);
             
         
       
//      })
//     });

//         App.createUser();
//         return App.render();
      
    
//   },

 

//   render: function() {
//     if (App.loading) {
//       return;
//     }
//     App.loading = true;

//     var loader  = $('');
//     var content = $('t');

//     loader.show();
//     content.hide();


    
   
//   },

//   createUser: function() {
//     $('').hide();
//     $('').show();
   
    

    
// }

// }

// $(function() {
//   $(window).load(function() {
//     App.init();
//   })
// });
