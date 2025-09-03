// Mental Health Chatbot Application
class MindfulSupportAI {
    constructor() {
        this.chatActive = false;
        this.conversationHistory = [];
        this.userName = '';
        this.userMood = null;
        this.sessionData = {
            startTime: new Date(),
            messageCount: 0,
            topicsDiscussed: []
        };

        // Therapeutic data from the provided JSON
        this.therapeuticResponses = {
            anxiety: {
                triggers: ["anxious", "anxiety", "worried", "panic", "nervous", "stress", "overwhelmed", "fear"],
                responses: [
                    "I can hear that you're feeling anxious right now. That must be really difficult. Would you like to try a quick grounding exercise together?",
                    "Anxiety can feel overwhelming, but you're not alone in this. Let's work through this step by step. Can you tell me what's contributing to these feelings?",
                    "It takes courage to reach out when you're feeling anxious. I'm here to support you. Would you like to explore some coping strategies that might help?"
                ],
                followUp: [
                    "Try the 5-4-3-2-1 technique: Name 5 things you can see, 4 you can touch, 3 things you can hear, 2 you can smell, and 1 you can taste.",
                    "Let's practice some deep breathing together. Breathe in for 4 counts, hold for 4, exhale for 6. This can help calm your nervous system.",
                    "Remember, anxiety is temporary. You've gotten through difficult moments before, and you can get through this one too."
                ]
            },
            depression: {
                triggers: ["depressed", "sad", "hopeless", "empty", "worthless", "tired", "lonely", "isolated", "hard", "difficult", "down"],
                responses: [
                    "I hear you, and I want you to know that your feelings are valid. Depression can make everything feel heavy, but you matter, and there is hope.",
                    "Thank you for sharing something so personal with me. It takes strength to acknowledge these feelings. You don't have to face this alone.",
                    "These feelings you're describing sound really painful. I'm glad you reached out. Even small steps forward can make a difference."
                ],
                followUp: [
                    "What's one tiny thing that might bring you even a moment of comfort today? It could be as simple as listening to a favorite song or having a warm drink.",
                    "Depression often tells us lies about ourselves. What's one thing you've accomplished recently, no matter how small?",
                    "Sometimes when we're feeling low, connecting with others or doing something meaningful can help. What has helped you feel better in the past?"
                ]
            },
            crisis: {
                triggers: ["suicide", "kill myself", "end it all", "not worth living", "hurt myself", "die", "death", "killing", "harm myself"],
                responses: [
                    "I'm really concerned about you right now. Your life has value, and there are people who want to help. Please reach out to the National Suicide Prevention Lifeline: 988.",
                    "What you're going through sounds incredibly painful, and I want you to get the support you need right now. Please contact emergency services (911) or call 988 for immediate help.",
                    "You deserve support and care. These feelings can change, even when they feel permanent. Please reach out to a crisis counselor immediately: Call or text 988."
                ]
            }
        };

        this.cbtTechniques = [
            {
                name: "Thought Challenging",
                description: "Examining negative thoughts for accuracy and balance",
                exercise: "Let's look at that thought together. What evidence supports it? What evidence contradicts it? What would you tell a friend having this same thought?"
            },
            {
                name: "Grounding Techniques",
                description: "Exercises to anchor yourself in the present moment",
                exercise: "Let's try the 5-4-3-2-1 technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
            },
            {
                name: "Progressive Muscle Relaxation",
                description: "Systematic tensing and relaxing of muscle groups",
                exercise: "Starting with your feet, tense the muscles for 5 seconds, then release and notice the contrast. Work your way up through your body, one muscle group at a time."
            }
        ];

        this.validationMessages = [
            "Your feelings are completely valid and understandable.",
            "It takes real courage to reach out and ask for support.",
            "You're not alone in feeling this way, and there's no shame in struggling.",
            "Thank you for trusting me with something so personal.",
            "What you're going through sounds really difficult, and I'm glad you're here.",
            "You're taking an important step by talking about this.",
            "Your willingness to work on your mental health shows real strength.",
            "It's okay to not be okay. Healing isn't linear, and that's normal."
        ];

        this.copingStrategies = {
            immediate: [
                "Deep breathing: 4 counts in, 4 hold, 6 counts out",
                "Cold water on your face or ice cubes in your hands",
                "Listen to calming music or nature sounds",
                "Call a trusted friend or family member",
                "Take a short walk, even if it's just around your room"
            ],
            daily: [
                "Maintain a regular sleep schedule",
                "Engage in physical activity, even light stretching",
                "Practice gratitude by writing down 3 things daily",
                "Limit caffeine and alcohol",
                "Create a morning routine that feels nurturing"
            ]
        };

        this.init();
    }

    init() {
        console.log('MindfulSupport AI initializing...');
        this.bindEvents();
        this.setupModal();
        console.log('MindfulSupport AI initialized successfully');
    }

    bindEvents() {
        console.log('Binding events...');
        
        // Action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        console.log('Found action buttons:', actionButtons.length);
        
        actionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = e.target.dataset.action;
                console.log('Action button clicked:', action);
                this.handleQuickAction(action);
            });
        });

        // Chat input
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');

        if (chatInput && sendBtn) {
            console.log('Setting up chat input events');
            
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }

        // Footer links
        const showResourcesBtn = document.getElementById('showResources');
        const clearChatBtn = document.getElementById('clearChat');

        if (showResourcesBtn) {
            console.log('Setting up resources button');
            showResourcesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Resources button clicked');
                this.showResourceModal();
            });
        }

        if (clearChatBtn) {
            clearChatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearChat();
            });
        }
    }

    setupModal() {
        console.log('Setting up modal...');
        const modal = document.getElementById('resourceModal');
        const closeBtn = document.getElementById('modalClose');
        
        if (modal && closeBtn) {
            console.log('Modal elements found, setting up events');
            const overlay = modal.querySelector('.modal-overlay');

            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Close button clicked');
                modal.classList.add('hidden');
            });

            if (overlay) {
                overlay.addEventListener('click', () => {
                    console.log('Overlay clicked');
                    modal.classList.add('hidden');
                });
            }

            // Close modal on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                    modal.classList.add('hidden');
                }
            });
        } else {
            console.log('Modal elements not found');
        }
    }

    handleQuickAction(action) {
        console.log('Handling quick action:', action);
        this.startChat();
        
        const actionMessages = {
            anxiety: "I'm feeling really anxious right now and could use some help.",
            coping: "I need some coping strategies to help me get through this.",
            mindfulness: "Can you help me with some mindfulness exercises?",
            thoughts: "I'm having a lot of negative thoughts and they're really bothering me.",
            talk: "I just need someone to talk to right now.",
            crisis: "I'm in crisis and need immediate support."
        };

        const message = actionMessages[action];
        if (message) {
            this.addMessage(message, 'user');
            // Call processUserMessage directly instead of using setTimeout
            this.processUserMessage(message);
        }
    }

    startChat() {
        console.log('Starting chat, current state:', this.chatActive);
        if (!this.chatActive) {
            this.chatActive = true;
            const appContainer = document.querySelector('.app-container');
            if (appContainer) {
                appContainer.classList.add('chat-active');
            }
            this.addMessage("Hello! I'm MindfulSupport AI. I'm here to listen and support you through whatever you're experiencing. What would you like to talk about today?", 'bot');
        }
    }

    sendMessage() {
        console.log('Send message called');
        const input = document.getElementById('chatInput');
        if (!input) {
            console.log('Input element not found');
            return;
        }

        const message = input.value.trim();
        console.log('Message to send:', message);
        
        if (message) {
            if (!this.chatActive) {
                this.startChat();
            }
            
            this.addMessage(message, 'user');
            input.value = '';
            
            // Call processUserMessage directly
            this.processUserMessage(message);
        }
    }

    addMessage(content, sender, isHtml = false) {
        console.log('Adding message from', sender, ':', content);
        
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) {
            console.log('Messages container not found');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message message--${sender}`;

        const avatar = document.createElement('div');
        avatar.className = `message-avatar message-avatar--${sender}`;
        avatar.textContent = sender === 'bot' ? '🌱' : '👤';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = `message-bubble message-bubble--${sender}`;
        
        if (isHtml) {
            bubble.innerHTML = content;
        } else {
            bubble.textContent = content;
        }

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        contentDiv.appendChild(bubble);
        contentDiv.appendChild(time);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.sessionData.messageCount++;
        this.conversationHistory.push({
            content,
            sender,
            timestamp: new Date()
        });
    }

    showTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.classList.add('show');
        }
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.classList.remove('show');
        }
    }

    processUserMessage(message) {
        console.log('Processing user message:', message);
        
        this.showTypingIndicator();
        
        // Use setTimeout to simulate thinking and then provide response
        setTimeout(() => {
            this.hideTypingIndicator();
            
            const lowerMessage = message.toLowerCase();
            console.log('Analyzing message:', lowerMessage);
            
            // Crisis detection - highest priority
            if (this.detectCrisis(lowerMessage)) {
                console.log('Crisis detected');
                this.handleCrisis();
                return;
            }

            // Detect emotional state and respond appropriately
            const emotionalResponse = this.analyzeEmotionalContent(lowerMessage);
            if (emotionalResponse) {
                console.log('Emotional response found:', emotionalResponse.type);
                this.addMessage(emotionalResponse.response, 'bot');
                
                // Follow up with techniques or additional support
                setTimeout(() => {
                    if (emotionalResponse.followUp) {
                        this.addMessage(emotionalResponse.followUp, 'bot');
                    }
                    if (emotionalResponse.exercise) {
                        this.offerExercise(emotionalResponse.exercise);
                    }
                }, 2000);
            } else {
                console.log('Providing general support');
                // General supportive response
                this.provideGeneralSupport(lowerMessage);
            }
        }, 1500); // Simulate thinking time
    }

    detectCrisis(message) {
        const crisisDetected = this.therapeuticResponses.crisis.triggers.some(trigger => 
            message.includes(trigger)
        );
        console.log('Crisis detection result:', crisisDetected);
        return crisisDetected;
    }

    handleCrisis() {
        console.log('Handling crisis situation');
        
        const crisisResponse = this.getRandomItem(this.therapeuticResponses.crisis.responses);
        
        const crisisHtml = `
            <div class="crisis-message">
                <h4>🚨 Immediate Support Available</h4>
                <p>${crisisResponse}</p>
                <div class="crisis-resources">
                    <strong>Crisis Resources:</strong>
                    <ul>
                        <li>📞 National Suicide Prevention Lifeline: <strong>988</strong></li>
                        <li>💬 Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong></li>
                        <li>🚨 Emergency Services: <strong>911</strong></li>
                    </ul>
                </div>
            </div>
        `;
        
        this.addMessage(crisisHtml, 'bot', true);
        
        // Follow up with additional support
        setTimeout(() => {
            this.addMessage("Please know that you are not alone, and these feelings can change. While you're getting professional help, I'm here to talk if you need support. Your life has value and meaning.", 'bot');
        }, 3000);
    }

    analyzeEmotionalContent(message) {
        console.log('Analyzing emotional content for:', message);
        
        // Check for anxiety indicators
        if (this.therapeuticResponses.anxiety.triggers.some(trigger => message.includes(trigger))) {
            console.log('Anxiety indicators found');
            return {
                type: 'anxiety',
                response: this.getRandomItem(this.therapeuticResponses.anxiety.responses),
                followUp: this.getRandomItem(this.therapeuticResponses.anxiety.followUp),
                exercise: this.cbtTechniques.find(t => t.name === "Grounding Techniques")
            };
        }

        // Check for depression indicators
        if (this.therapeuticResponses.depression.triggers.some(trigger => message.includes(trigger))) {
            console.log('Depression indicators found');
            return {
                type: 'depression',
                response: this.getRandomItem(this.therapeuticResponses.depression.responses),
                followUp: this.getRandomItem(this.therapeuticResponses.depression.followUp),
                exercise: this.cbtTechniques.find(t => t.name === "Thought Challenging")
            };
        }

        console.log('No specific emotional indicators found');
        return null;
    }

    provideGeneralSupport(message) {
        console.log('Providing general support');
        
        const supportiveResponses = [
            "I hear you. Thank you for sharing that with me. Can you tell me more about what you're experiencing?",
            "It sounds like you're going through something difficult. I'm here to listen and support you.",
            "What you're feeling is important. Would you like to explore this together?",
            "I appreciate you opening up. How has this been affecting you day to day?",
            "That sounds challenging. What kind of support would feel most helpful right now?"
        ];

        const validation = this.getRandomItem(this.validationMessages);
        const support = this.getRandomItem(supportiveResponses);
        
        this.addMessage(validation, 'bot');
        
        setTimeout(() => {
            this.addMessage(support, 'bot');
            
            // Offer coping strategies
            setTimeout(() => {
                this.offerCopingStrategies();
            }, 2000);
        }, 1500);
    }

    offerExercise(exercise) {
        console.log('Offering exercise:', exercise.name);
        
        const exerciseHtml = `
            <div class="exercise-card">
                <h4>${exercise.name}</h4>
                <p>${exercise.description}</p>
                <div class="exercise-steps">
                    ${exercise.exercise}
                </div>
            </div>
        `;
        
        setTimeout(() => {
            this.addMessage("Here's a therapeutic exercise that might help:", 'bot');
            this.addMessage(exerciseHtml, 'bot', true);
            this.addMessage("Take your time with this. There's no pressure to do it perfectly. How does that feel to try?", 'bot');
        }, 1000);
    }

    offerCopingStrategies() {
        console.log('Offering coping strategies');
        
        const strategies = this.getRandomItem([
            {
                title: "Immediate Relief Strategies",
                list: this.copingStrategies.immediate
            },
            {
                title: "Daily Wellness Practices",
                list: this.copingStrategies.daily
            }
        ]);

        const strategiesHtml = `
            <div class="exercise-card">
                <h4>${strategies.title}</h4>
                <ul>
                    ${strategies.list.slice(0, 3).map(strategy => `<li>${strategy}</li>`).join('')}
                </ul>
            </div>
        `;

        setTimeout(() => {
            this.addMessage("Here are some coping strategies that many people find helpful:", 'bot');
            this.addMessage(strategiesHtml, 'bot', true);
            this.addMessage("Which of these resonates with you, or would you like to try one together?", 'bot');
        }, 1000);
    }

    getRandomItem(array) {
        if (!array || array.length === 0) return '';
        return array[Math.floor(Math.random() * array.length)];
    }

    showResourceModal() {
        console.log('Showing resource modal');
        const modal = document.getElementById('resourceModal');
        if (modal) {
            console.log('Modal found, removing hidden class');
            modal.classList.remove('hidden');
        } else {
            console.log('Modal element not found');
        }
    }

    clearChat() {
        const shouldClear = confirm('Are you sure you want to start a new conversation? This will clear your current chat.');
        
        if (shouldClear) {
            console.log('Clearing chat');
            this.chatActive = false;
            this.conversationHistory = [];
            this.sessionData = {
                startTime: new Date(),
                messageCount: 0,
                topicsDiscussed: []
            };
            
            const appContainer = document.querySelector('.app-container');
            if (appContainer) {
                appContainer.classList.remove('chat-active');
            }
            
            const chatMessages = document.getElementById('chatMessages');
            const chatInput = document.getElementById('chatInput');
            
            if (chatMessages) {
                chatMessages.innerHTML = '';
            }
            
            if (chatInput) {
                chatInput.value = '';
            }
        }
    }
}

// Initialize the application
let mindfulSupportAI;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing MindfulSupport AI');
    mindfulSupportAI = new MindfulSupportAI();
});