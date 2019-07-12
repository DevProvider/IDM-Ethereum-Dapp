pragma solidity >=0.4.21 <0.6.0;

contract Signup {

    struct User {
        string name;
        string password;
        bool set;
    }
    
    mapping(address => User) public users;

    function createUser(address _userAddress, string memory userName, string memory password) public {
        
        User storage user = users[_userAddress];
        
        // Check that the user did not already exist:
        require(!user.set);
       
        //Store the user
        users[_userAddress] = User({
            name: userName,
            password: password,
            set: true
        });
}

       
        function getUser(address _userAddress) public returns (address) {

            User storage user = users[_userAddress];

            require(!user.set);


            return _userAddress;
    }
    }

