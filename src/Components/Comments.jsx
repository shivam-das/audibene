import react,{useEffect, useState} from 'react';
import RootComment from './RootComment';
import NestedComments from './NestedComments';

export default function Comment(){

    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({});

    useEffect(()=>{
        fetch("https://gist.githubusercontent.com/mkg0/6a4dca9067ad7a296204e7c9ecd977b0/raw/0b1ec16580ea1e970a73f5c85563c22631be7ad7/unpopularopinion-dataset.json")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setPost(res);
            setComments(parseComments(res.comments));

        });
    },[]);

    function getCommentIdMap(comments) {
        const commentIdMap = {};
        comments.forEach((comment) => {
            commentIdMap[comment.id] = comment;
        });
        return commentIdMap;
    }
    
    function parseComments(comments = []) {
        // Making a map, so lookup will be easier and efficient
        const commentIdMap = getCommentIdMap(comments);
    
        comments.forEach((comment) => {
            if (comment.parent_id) {
                // This comment is a nested comment under some other comment
                const parentComment = commentIdMap[comment.parent_id];
                
                if (parentComment) {
                  //Append current comment as child comment to parent
                  if (!parentComment.children) {
                      parentComment.children = [comment];
                  } else {
                      parentComment.children.push(comment);
                  }
                } else {
                  console.log('This comment does not have proper parent', comment);
                }
            }
        });
    
        // Finding comments with no parent id, these will be the root items
        const rootComments = comments.filter(comment => !comment.parent_id);
    
        return rootComments.map((comment) => commentIdMap[comment.id]);
    }
    return (
        
        <div>
            {post.title}
            <RootComment text={post.selftext}/>
            <NestedComments comments={comments}/>
        </div>
    );
}