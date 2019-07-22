pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2; 
contract Signup {

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
}

