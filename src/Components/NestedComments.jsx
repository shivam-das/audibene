import  { Comment } from 'antd';

const ExampleComment = ({children, comment}) => (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author={<a>{comment.author}</a>}
      content={
        <p>
          {comment.body}
        </p>
      }
    >
      {children}
    </Comment>
  );

const MainComponent = ({comments=[]}) => {
    
    return comments && comments.map((comment) => {
       if (comment.children && comment.children.length) {
           // Nested comments under this comment
           return (
            <ExampleComment comment={comment}>
                <MainComponent comments={comment.children} />
            </ExampleComment>
           );
       } else {
            return <ExampleComment comment={comment} />
       }
    });
};

export default MainComponent;

// ReactDOM.render(
//   <MainComponent comments={parseComments(responseComments)} />,
//   mountNode,
// );