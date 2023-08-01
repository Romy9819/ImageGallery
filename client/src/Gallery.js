import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import {AiFillLike, AiOutlineLike, AiOutlineComment, AiOutlineShareAlt, AiOutlineDownload, AiOutlineClose} from 'react-icons/ai'
import './Gallery.css';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [likedImages, setLikedImages] = useState([]);
    const [showLikeIcon, setShowLikeIcon] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [currentImgId, setCurrentImgId] = useState("");

    useEffect(() => {
        fetchImages();
    }, [])

    const fetchImages = async () => {
        try {
            const response = await axios.get('/images');
            const imagesData = response.data;
            const imagesWithCorrectUrl = imagesData.map((image) => ({
                ...image,
                imageUrl: `http://localhost:5000/${image.imageUrl.replace(/\\/g, '/')}`,
        }));
        setImages(imagesWithCorrectUrl);
        } catch (error) {
            console.log(`Error Fetching Images: ${error}`);
        }
    }

    const handleLike = async (imageId) => {
        setShowLikeIcon(!showLikeIcon);
        try {
            if (likedImages.includes(imageId)) {
                const response = await axios.post(`/images/${imageId}/dislike`)
                console.log(response.data.message);

                setLikedImages(likedImages.filter((id) => id !== imageId))

                setImages((prevImages) => {
                    return prevImages.map((image) => {
                    if (image._id === imageId) {
                        return { ...image, likes: image.likes - 1, liked: false };
                    } else {
                        return image;
                    }
                    });
                });
            } else {
                const response = await axios.post(`/images/${imageId}/like`)
                console.log(response.data.message)

                setLikedImages([...likedImages, imageId]);

                setImages((prevImages) => {
                    return prevImages.map((image) => {
                    if (image._id === imageId) {
                        return { ...image, likes: image.likes + 1, liked: true };
                    } else {
                        return image;
                    }
                    });
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleComment = (id) => {
        setOpenDialog(true)
        setCurrentImgId(id)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setCommentText("")
    }

    const handlePostComment = async () => {
        try {
            const response = await axios.post(`/images/${currentImgId}/comment`, {text: commentText})
            console.log(response.data.message);
            setCommentText("")
        } catch (error) {
            console.log(error);
        }
    }

    const handleShare = async (imageId) => {
        // try {
        //     const response = await axios.get(`/share/${imageId}`)
        //   } catch (error) {
        //     console.error("Error sharing the photo:", error);
        //   }
    }

    const handleDownload = async (imageName) => {
        try {
            const response = await axios.get(`/download/${imageName}`, {
              responseType: 'blob', // Important: Set the responseType to 'blob'
            });
      
            // Create a URL for the blob response
            const url = window.URL.createObjectURL(new Blob([response.data]));
      
            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', imageName); // Set the download attribute to the desired filename
            document.body.appendChild(link);
            link.click();
      
            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
          } catch (error) {
            console.error('Error downloading image:', error);
          }
    }

    return (
        <>
            <Navbar/>
            <div className="gallery">
                {images.map((image) => (
                    <div key={image._id} className="gallery-container">
                        <img src={image.imageUrl} alt={image.title} style={{height: "20vh"}}/>
                        <div className="Operations">
                            <div className="left">
                                {image.liked ? 
                                    <AiFillLike 
                                        onClick={() => handleLike(image._id)} 
                                        style={{fontSize: "1.5rem", 
                                        cursor: "pointer"}}
                                    /> : 
                                    <AiOutlineLike 
                                        onClick={() => handleLike(image._id)} 
                                        style={{fontSize: "1.5rem", 
                                        cursor: "pointer"}}
                                    />}
                                <AiOutlineComment onClick={() => handleComment(image._id)} style={{fontSize: "1.5rem", cursor: "pointer"}}/>
                                <AiOutlineShareAlt onClick={() => handleShare(image._id)} style={{fontSize: "1.5rem", cursor: "pointer"}}/>
                            </div>
                            <div className="right">
                                <AiOutlineDownload onClick={() => handleDownload(image.imageUrl.split('/').pop())} style={{fontSize: "1.5rem", cursor: "pointer"}}/>
                            </div>
                        </div>
                        <div className="likeCount">{image.likes === 1 ? `${image.likes} like` : `${image.likes} likes`}</div>
                    </div>
                ))}
                {openDialog && 
                    <Dialog open={openDialog} 
                            onClose={handleCloseDialog}
                            PaperProps={{
                                style: {
                                  width: "700px", // Set the desired width
                                  height: "400px", // Set the desired height
                                },
                              }}
                            >
                        <DialogTitle>Add comments
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseDialog}
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 8,
                                }}
                            >
                                <AiOutlineClose />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <div key={currentImgId}>
                                {images.map((image) => {
                                    if (currentImgId === image._id) {
                                        return image.comments.map((comment, index) => (
                                            <div>
                                                {/* <AiOutlineUser/> */}
                                                <p key={index}>{comment.text}</p>
                                            </div>
                                        ));
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <input 
                                type="text" 
                                placeholder="Add your comments here" 
                                value={commentText} 
                                onChange={(e) => setCommentText(e.target.value)}
                                style={{padding: "5px", width: "85%"}}
                            />
                            <Button onClick={() => handlePostComment(currentImgId)}>Post</Button>
                        </DialogActions>
                    </Dialog>
                }
            </div>
        </>
    )
}

export default Gallery;