
import React, { useState, useEffect } from 'react';
import App from './Section/App.jsx';
import Meta from './Helmet/Meta.jsx';

<Meta title="Agri vision | Consumer" />

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Add an initial bot message when the chatbot is loaded
    setMessages([
      { sender: 'bot', text: 'Hello Farmer, how can I assist you today?' },
    ]);
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = input.trim().toLowerCase();
      setMessages((prev) => [...prev, { sender: 'user', text: input }]);
      setInput('');
  
      setTimeout(() => {
        let botResponse = "I'am not sure, please check the query and do resend.";
  
        // Keyword matching for common queries
        if (userMessage.includes('crop health')) {
          botResponse =
            'To improve crop health, ensure soil nutrients are balanced, use organic fertilizers, and rotate crops to reduce pests.';

        } else if (userMessage.includes('government schemes')) {
          botResponse =
            'Some popular schemes include PM-KISAN for financial support and KCC for low-interest loans. Visit your local agriculture office for details.';

        } else if (userMessage.includes('weather')) {
          botResponse =
            'please click the provided weather option at nav bar, then enter place and get required details.';

        } else if (userMessage.includes('market prices')) {
          botResponse =
            'Keep track of local mandi prices through apps like eNAM or consult your local market.';

        } else if (userMessage.includes('pest management')) {
          botResponse =
            'Use integrated pest management techniques, including crop rotation, biological control, and resistant crop varieties.';

        } else if (userMessage.includes('water scarcity')) {
          botResponse =
            'Consider implementing drip irrigation and rainwater harvesting systems to optimize water use.';

        } else if (userMessage.includes('soil fertility')) {
          botResponse =
            'Regularly test soil and use organic fertilizers like compost and manure to maintain soil health.';

        } else if (userMessage.includes('climate change')) {
          botResponse =
            'Adopt climate-smart agricultural practices like conservation tillage, agroforestry, and crop diversification.';

        } else if (userMessage.includes('credit')) {
          botResponse =
            'Explore microfinance options and government schemes designed for financial support to small and marginal farmers.';

        } else if (userMessage.includes('post-harvest losses')) {
          botResponse =
            'Invest in proper storage facilities and cold chain logistics to minimize losses and maintain produce quality.';

        } 
        else if (userMessage.includes('thank you')) {
          botResponse = 'You’re welcome! Let me know if there’s anything else I can assist you with.';
        }
        else if (userMessage.includes('hello')) {
          botResponse = 'Hello ,how may i assist you';
        }
  
        setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      }, 1000);
    }
  };
  

  return (
    <>
      <App/>
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '350px',
        height: '500px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
     
      {/* Header */}
      <div
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px',
          textAlign: 'center',
          fontWeight: 'bold',
          borderRadius: '10px 10px 0 0',
        }}
      >
        Farmer's Chatbot
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          padding: '10px',
          overflowY: 'auto',
          backgroundColor: '#f9f9f9',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '5px 0',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: msg.sender === 'user' ? '#007bff' : '#e9ecef',
                color: msg.sender === 'user' ? '#fff' : '#000',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div
        style={{
          display: 'flex',
          padding: '10px',
          borderTop: '1px solid #ddd',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginRight: '5px',
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
    </>
  );
};

export default Chatbot;









// import React, { useState, useEffect } from "react";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [showChat, setShowChat] = useState(false);

//   const defaultOptions = [
//     {
//       text: "Crop Health",
//       response:
//         "To improve crop health, ensure soil nutrients are balanced, use organic fertilizers, and rotate crops to reduce pests and diseases.",
//     },
//     {
//       text: "Government Schemes",
//       response:
//         "Popular schemes include PM-KISAN for financial support and KCC for low-interest loans. Contact your local agriculture office for details.",
//     },
//     {
//       text: "Weather Forecast",
//       response:
//         "Check the IMD website or weather apps to track conditions and plan irrigation or sowing.",
//     },
//     {
//       text: "Market Prices",
//       response:
//         "Use apps like eNAM or consult your local mandi to stay updated on crop prices.",
//     },
//     {
//       text: "Pest and Disease Management",
//       response:
//         "Use integrated pest management techniques like crop rotation, biological control, and resistant crop varieties.",
//     },
//     {
//       text: "Water Scarcity",
//       response:
//         "Implement drip irrigation systems and rainwater harvesting to conserve water and ensure crops receive adequate moisture.",
//     },
//     {
//       text: "Soil Fertility",
//       response:
//         "Regularly test soil and use organic fertilizers like compost and manure to maintain health and fertility.",
//     },
//     {
//       text: "Climate Change",
//       response:
//         "Adopt climate-smart practices such as conservation tillage, agroforestry, and crop diversification.",
//     },
//     {
//       text: "Access to Credit",
//       response:
//         "Explore microfinance options and government schemes designed to provide financial support to farmers.",
//     },
//     {
//       text: "Post-Harvest Losses",
//       response:
//         "Invest in storage facilities and cold chain logistics to reduce losses and maintain produce quality.",
//     },
//     {
//       text: "Farming Equipment",
//       response:
//         "Contact local agricultural dealers or explore subsidies on farming equipment provided under government schemes.",
//     },
//     {
//       text: "Organic Farming",
//       response:
//         "Organic farming involves using natural fertilizers, crop rotation, and biological pest control. It ensures sustainability and better market value.",
//     },
//     {
//       text: "Support Helplines",
//       response:
//         "You can contact your local agricultural helpline or call the Kisan Call Centre at 1800-180-1551 for expert guidance.",
//     },
//   ];

//   const addMessage = (message, isUser = false) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: message, isUser },
//     ]);
//   };

//   const handleOptionClick = (response) => {
//     addMessage(response, false);
//   };

//   const startChat = () => {
//     addMessage("Hello Farmer, how can I assist you today?", false);
//   };

//   useEffect(() => {
//     if (showChat) {
//       startChat();
//     }
//   }, [showChat]);

//   // Inline styles
//   const styles = {
//     chatbotButton: {
//       backgroundColor: "#4caf50",
//       color: "white",
//       border: "none",
//       padding: "10px 20px",
//       fontSize: "16px",
//       borderRadius: "5px",
//       cursor: "pointer",
//       margin: "20px",
//     },
//     chatbotContainer: {
//       width: "400px",
//       height: "500px",
//       position: "fixed",
//       bottom: "20px",
//       right: "20px",
//       borderRadius: "10px",
//       backgroundColor: "#ffffff",
//       boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//       display: "flex",
//       flexDirection: "column",
//       overflow: "hidden",
//     },
//     chatbotHeader: {
//       backgroundColor: "#4caf50",
//       color: "white",
//       padding: "10px",
//       fontSize: "18px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     chatbotMessages: {
//       flex: 1,
//       overflowY: "auto",
//       padding: "10px",
//       backgroundColor: "#f9f9f9",
//     },
//     chatbotMessage: {
//       margin: "5px 0",
//       padding: "10px",
//       borderRadius: "5px",
//     },
//     userMessage: {
//       backgroundColor: "#4caf50",
//       color: "white",
//       alignSelf: "flex-end",
//     },
//     botMessage: {
//       backgroundColor: "#ddd",
//       alignSelf: "flex-start",
//     },
//     chatbotOptions: {
//       padding: "10px",
//       display: "flex",
//       flexWrap: "wrap",
//       gap: "10px",
//     },
//     chatbotOption: {
//       backgroundColor: "#007bff",
//       color: "white",
//       border: "none",
//       padding: "8px 15px",
//       borderRadius: "5px",
//       cursor: "pointer",
//       transition: "background-color 0.3s ease",
//     },
//     chatbotOptionHover: {
//       backgroundColor: "#0056b3",
//     },
//     closeButton: {
//       backgroundColor: "transparent",
//       border: "none",
//       color: "white",
//       fontSize: "18px",
//       cursor: "pointer",
//     },
//   };

//   return (
//     <div style={{marginTop:"500px"}}>
//       <button
//         onClick={() => setShowChat(!showChat)}
//         style={styles.chatbotButton}
//       >
//         Chatbot
//       </button>
//       {showChat && (
//         <div style={styles.chatbotContainer}>
//           <div style={styles.chatbotHeader}>
//             <h2>Farmer's Chatbot</h2>
//             <button
//               style={styles.closeButton}
//               onClick={() => setShowChat(false)}
//             >
//               Close
//             </button>
//           </div>
//           <div style={styles.chatbotMessages}>
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 style={{
//                   ...styles.chatbotMessage,
//                   ...(msg.isUser ? styles.userMessage : styles.botMessage),
//                 }}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <div style={styles.chatbotOptions}>
//             {defaultOptions.map((option, index) => (
//               <button
//                 key={index}
//                 style={styles.chatbotOption}
//                 onClick={() => {
//                   addMessage(option.text, true);
//                   setTimeout(() => handleOptionClick(option.response), 500);
//                 }}
//               >
//                 {option.text}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
