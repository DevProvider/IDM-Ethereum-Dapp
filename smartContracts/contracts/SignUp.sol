pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2; 
contract Signup {
 enum State {
          PENDING,
          ACCEPTED,
          REJECTED
    }

    struct Transaction {
        address          to;
        address         from;
        State           state;
        string           date;
    }

    uint public sequence =0;
    uint public nbPendingTrasanction = 0;
    
    struct User {
        string username;
        string  password;
        string privateKey;
        bool set;
    }

    struct userDetails{
        string name;
        string DOB;
        string gender;
        string NIC;
        string desigination;
        bool set;
    }
    mapping(address => Transaction) db;
    mapping(address => User) public users;
    mapping(address => userDetails) public details;


    function createUser(address _userAddress,string memory userName,string memory password,string memory _privateKey) public {
        User storage user = users[_userAddress];
        // Check that the user does not already exist:
        require(!user.set,"User Already Exsists");
        //Store the user
        users[_userAddress] = User({
            username: userName,
            password: password,
            privateKey: _privateKey,
            set: true
        });
    }
    function setUserDetail(address _userAddress, string memory name,string memory dob,string memory gender,
    string memory nic,string memory desigination ) public {
        userDetails storage detail = details[_userAddress];
        require(!detail.set,"Profile is already saved");
        //set Details
        details[_userAddress] = userDetails({
            name:name,
            DOB:dob,
            gender:gender,
            NIC:nic,
            desigination:desigination,
            set:true
        });
}

    function getUser(address _userAddress) public view returns (int) {
        User storage user = users[_userAddress];
        if (!user.set)
        {
            return 0;
        }

        return 1;
    }
    function login(address _userAddress, string memory username, string memory password) public view returns (address){
       if (keccak256(abi.encodePacked((username))) == keccak256(abi.encodePacked((users[_userAddress].username)))){
           if( keccak256(abi.encodePacked((password))) == keccak256(abi.encodePacked((users[_userAddress].password)))){
           return _userAddress;
           }
       }
    }

   function getUserDetails(address _userAddress) public view returns (User memory s, userDetails memory t) {
           s.username = users[_userAddress].username;
           s.password = users[_userAddress].password;
           s.privateKey = users[_userAddress].privateKey;

           t.name = details[_userAddress].name;
           t.DOB = details[_userAddress].DOB;
           t.gender = details[_userAddress].gender;
           t.NIC = details[_userAddress].NIC;
           t.desigination = details[_userAddress].desigination;

           }

    event received_notification(address to, address from,State state, string date);
   
    function getPendingTransactions(address to) public view returns (address[] memory) {
       if(nbPendingTrasanction == 0) {
            return new address[](0);
        }
     address[] memory policyIDArray = new address[](nbPendingTrasanction);
        uint index = 0;
        for(uint id = 0; id < sequence; id++){
            Transaction memory t = db[to];
         if(t.state == State.PENDING) {
                policyIDArray[index] = t.from;
                index++;
            }
        }
     return (policyIDArray);
    }
    function getTransactionDetail(address _id) public view returns (address, address, State, string memory) {
        return (db[_id].to, db[_id].from, db[_id].state, db[_id].date);
    }
    function receiveNotification(address to  ,address from) public {
        Transaction memory t; 
        t.to = to;
        t.from = from;
        t.state = State.PENDING;
        t.date = '';
        // Store the transaction
        db[t.to] = t;
        // Increment sequence
        sequence++; 
        // Increment the no of pending transactions
        nbPendingTrasanction++;
        // Trigger event
        emit received_notification(t.to, t.from, t.state, t.date);
    }
    function acceptNotification(address _id , string memory date) public {
         db[_id].state = State.ACCEPTED;
         db[_id].date = date;
        // Decrement the no of pending transactions
        nbPendingTrasanction--;
    }
    function rejectNotification(address _id, string memory date)  public {
       // Change the state to Rejected
        db[_id].state = State.REJECTED;
        db[_id].date = date;
       // Decrement the no of pending transactions
        nbPendingTrasanction--;

    }


}