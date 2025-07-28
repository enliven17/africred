// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title AfriCredCertificates
 * @dev NFT contract for educational certificates on AfriCred platform
 * @author AfriCred Team
 */
contract AfriCredCertificates is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    // Certificate types
    enum CertificateType {
        MISSION_COMPLETION,
        EDUCATOR_VERIFICATION,
        ACHIEVEMENT,
        COURSE_COMPLETION
    }
    
    // Certificate metadata
    struct CertificateMetadata {
        CertificateType certType;
        string missionTitle;
        string studentName;
        uint256 score;
        uint256 maxScore;
        uint256 completionDate;
        string educatorAddress;
        string certificateHash;
        bool isRevoked;
    }
    
    // Mapping from token ID to certificate metadata
    mapping(uint256 => CertificateMetadata) public certificates;
    
    // Mapping from address to their certificates
    mapping(address => uint256[]) public userCertificates;
    
    // Events
    event CertificateIssued(
        uint256 indexed tokenId,
        address indexed student,
        string missionTitle,
        uint256 score,
        uint256 maxScore,
        CertificateType certType
    );
    
    event CertificateRevoked(uint256 indexed tokenId, address indexed revoker);
    event CertificateUpdated(uint256 indexed tokenId, string newURI);
    
    constructor() ERC721("AfriCred Certificates", "AFRICRED") Ownable(msg.sender) {}
    
    /**
     * @dev Issue a mission completion certificate
     * @param student Address of the student
     * @param missionTitle Title of the completed mission
     * @param score Student's score
     * @param maxScore Maximum possible score
     * @param studentName Name of the student
     * @param educatorAddress Address of the educator
     * @param certificateHash Hash of the certificate data
     * @param tokenURI URI for the certificate metadata
     */
    function issueMissionCertificate(
        address student,
        string memory missionTitle,
        uint256 score,
        uint256 maxScore,
        string memory studentName,
        string memory educatorAddress,
        string memory certificateHash,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        require(student != address(0), "Invalid student address");
        require(score <= maxScore, "Score cannot exceed max score");
        require(bytes(missionTitle).length > 0, "Mission title cannot be empty");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(student, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        certificates[newTokenId] = CertificateMetadata({
            certType: CertificateType.MISSION_COMPLETION,
            missionTitle: missionTitle,
            studentName: studentName,
            score: score,
            maxScore: maxScore,
            completionDate: block.timestamp,
            educatorAddress: educatorAddress,
            certificateHash: certificateHash,
            isRevoked: false
        });
        
        userCertificates[student].push(newTokenId);
        
        emit CertificateIssued(
            newTokenId,
            student,
            missionTitle,
            score,
            maxScore,
            CertificateType.MISSION_COMPLETION
        );
        
        return newTokenId;
    }
    
    /**
     * @dev Issue an educator verification certificate
     * @param educator Address of the educator
     * @param educatorName Name of the educator
     * @param background Educational background
     * @param experience Years of experience
     * @param expertise Areas of expertise
     * @param certificateHash Hash of the verification data
     * @param tokenURI URI for the certificate metadata
     */
    function issueEducatorCertificate(
        address educator,
        string memory educatorName,
        string memory background,
        string memory experience,
        string memory expertise,
        string memory certificateHash,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        require(educator != address(0), "Invalid educator address");
        require(bytes(educatorName).length > 0, "Educator name cannot be empty");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(educator, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        certificates[newTokenId] = CertificateMetadata({
            certType: CertificateType.EDUCATOR_VERIFICATION,
            missionTitle: "Educator Verification",
            studentName: educatorName,
            score: 100, // Educators get 100% for verification
            maxScore: 100,
            completionDate: block.timestamp,
            educatorAddress: background, // Reusing this field for background
            certificateHash: certificateHash,
            isRevoked: false
        });
        
        userCertificates[educator].push(newTokenId);
        
        emit CertificateIssued(
            newTokenId,
            educator,
            "Educator Verification",
            100,
            100,
            CertificateType.EDUCATOR_VERIFICATION
        );
        
        return newTokenId;
    }
    
    /**
     * @dev Issue an achievement certificate
     * @param recipient Address of the achievement recipient
     * @param achievementTitle Title of the achievement
     * @param recipientName Name of the recipient
     * @param description Achievement description
     * @param certificateHash Hash of the achievement data
     * @param tokenURI URI for the certificate metadata
     */
    function issueAchievementCertificate(
        address recipient,
        string memory achievementTitle,
        string memory recipientName,
        string memory description,
        string memory certificateHash,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        require(recipient != address(0), "Invalid recipient address");
        require(bytes(achievementTitle).length > 0, "Achievement title cannot be empty");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        certificates[newTokenId] = CertificateMetadata({
            certType: CertificateType.ACHIEVEMENT,
            missionTitle: achievementTitle,
            studentName: recipientName,
            score: 100, // Achievements are always 100%
            maxScore: 100,
            completionDate: block.timestamp,
            educatorAddress: description, // Reusing this field for description
            certificateHash: certificateHash,
            isRevoked: false
        });
        
        userCertificates[recipient].push(newTokenId);
        
        emit CertificateIssued(
            newTokenId,
            recipient,
            achievementTitle,
            100,
            100,
            CertificateType.ACHIEVEMENT
        );
        
        return newTokenId;
    }
    
    /**
     * @dev Revoke a certificate (only owner can revoke)
     * @param tokenId ID of the certificate to revoke
     */
    function revokeCertificate(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "Certificate does not exist");
        require(!certificates[tokenId].isRevoked, "Certificate already revoked");
        
        certificates[tokenId].isRevoked = true;
        
        emit CertificateRevoked(tokenId, msg.sender);
    }
    
    /**
     * @dev Update certificate metadata URI
     * @param tokenId ID of the certificate
     * @param newURI New URI for the certificate metadata
     */
    function updateCertificateURI(uint256 tokenId, string memory newURI) public onlyOwner {
        require(_exists(tokenId), "Certificate does not exist");
        
        _setTokenURI(tokenId, newURI);
        
        emit CertificateUpdated(tokenId, newURI);
    }
    
    /**
     * @dev Get all certificates for a user
     * @param user Address of the user
     * @return Array of certificate token IDs
     */
    function getUserCertificates(address user) public view returns (uint256[] memory) {
        return userCertificates[user];
    }
    
    /**
     * @dev Get certificate metadata
     * @param tokenId ID of the certificate
     * @return Certificate metadata
     */
    function getCertificateMetadata(uint256 tokenId) public view returns (CertificateMetadata memory) {
        require(_exists(tokenId), "Certificate does not exist");
        return certificates[tokenId];
    }
    
    /**
     * @dev Check if a certificate is valid (not revoked)
     * @param tokenId ID of the certificate
     * @return True if certificate is valid
     */
    function isCertificateValid(uint256 tokenId) public view returns (bool) {
        require(_exists(tokenId), "Certificate does not exist");
        return !certificates[tokenId].isRevoked;
    }
    
    /**
     * @dev Get total number of certificates issued
     * @return Total number of certificates
     */
    function getTotalCertificates() public view returns (uint256) {
        return _tokenIds.current();
    }
    
    /**
     * @dev Get certificate count for a user
     * @param user Address of the user
     * @return Number of certificates owned by the user
     */
    function getUserCertificateCount(address user) public view returns (uint256) {
        return userCertificates[user].length;
    }
    
    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
} 