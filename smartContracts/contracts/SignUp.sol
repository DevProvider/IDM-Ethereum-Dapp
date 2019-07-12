pragma solidity >=0.4.21 <0.6.0;

contract Signup {

    struct User {
        string name;
        string password;
        string privateKey;
        bool set;
    }

    mapping(address => User) public users;

    function createUser(address _userAddress, string memory userName, string memory password, string memory _privateKey) public {
        User storage user = users[_userAddress];
        // Check that the user does not already exist:
        require(!user.set,"User Already Exsists");
        //Store the user
        users[_userAddress] = User({
            name: userName,
            password: password,
            privateKey: _privateKey,
            set: true
        });
    }

    function getUser(address _userAddress) public view returns (int) {
        User storage user = users[_userAddress];
        // require(!user.set,"Address is in use");
        if (!user.set)
        {
            return 0;
        }

        return 1;
    }
}

