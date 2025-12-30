import React, {useContext, useState} from 'react';
import './Sidebar.css';
import {assets} from '../../assets/assets';
import {Context} from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showActivity, setShowActivity] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    const handleHelp = () => {
        setShowHelp(true);
    }

    const handleActivity = () => {
        setShowActivity(true);
    }

    const handleSettings = () => {
        setShowSettings(true);
    }

    const closeModal = () => {
        setShowHelp(false);
        setShowActivity(false);
        setShowSettings(false);
    }

    const clearHistory = () => {
        if (window.confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
            // Add your clear history logic here
            alert('History cleared!');
        }
    }

    return (
        <>
            <aside className={`sidebar ${extended ? 'extended' : 'collapsed'}`}>
                <div className={`top  ${extended ? '' : 'centered'}`}>
                    <div className="menu" onClick={() => setExtended(prev => !prev)}>
                        <img src={assets.menu_icon} alt="Menu Icon"/>
                    </div>
                    <div onClick={() => newChat()} className="new-chat">
                        <img src={assets.plus_icon} alt="Plus Icon"/>
                        <p className={`${extended ? 'block' : 'none'}`}>New Chat</p>
                    </div>
                    {extended ?
                        <div className="recent">
                            <p className="recent-title">Recent</p>
                            {prevPrompts.map((item, index) => {
                                return (
                                    <div key={`recent-${index}`} onClick={() => loadPrompt(item)} className="recent-entry">
                                        <img src={assets.message_icon} alt="Message"/>
                                        <p className="recent-entry-p">{item.slice(0, 18)} ...</p>
                                    </div>
                                )
                            })}
                        </div>
                        : null
                    }
                </div>
                <div className={`bottom  ${extended ? '' : 'centered'}`}>
                    <div className="bottom-item recent-entry" onClick={handleHelp}>
                        <img src={assets.question_icon} alt="Question Icon"/>
                        <p className={`fade ${extended ? 'block' : 'none'}`}>Help</p>
                    </div>
                    <div className="bottom-item recent-entry" onClick={handleActivity}>
                        <img src={assets.history_icon} alt="History Icon"/>
                        <p className={`fade ${extended ? 'block' : 'none'}`}>Activity</p>
                    </div>
                    <div className="bottom-item recent-entry" onClick={handleSettings}>
                        <img src={assets.setting_icon} alt="Settings Icon"/>
                        <p className={`fade ${extended ? 'block' : 'none'}`}>Settings</p>
                    </div>
                </div>
            </aside>

            {/* Help Modal */}
            {showHelp && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Help & Support</h2>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="help-section">
                                <h3>🚀 Getting Started</h3>
                                <ul>
                                    <li>Type your question in the chat box below</li>
                                    <li>Press Enter or click the Send button to get a response</li>
                                    <li>Click "New Chat" to start a fresh conversation</li>
                                    <li>Use the menu icon to expand/collapse the sidebar</li>
                                </ul>
                            </div>
                            <div className="help-section">
                                <h3>💡 Tips for Better Results</h3>
                                <ul>
                                    <li>Be specific and clear with your questions</li>
                                    <li>You can ask follow-up questions in the same chat</li>
                                    <li>Recent conversations are automatically saved</li>
                                    <li>Click on any recent chat to continue that conversation</li>
                                </ul>
                            </div>
                            <div className="help-section">
                                <h3>📞 Need More Help?</h3>
                                <p>If you have questions or need assistance:</p>
                                <p className="contact-info">📧 Email: support@geminiclone.com</p>
                                <p className="contact-info">🌐 Website: www.geminiclone.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Activity Modal */}
            {showActivity && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content activity-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Activity History</h2>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="activity-list">
                                {prevPrompts.length > 0 ? (
                                    prevPrompts.map((item, index) => (
                                        <div 
                                            key={`activity-${index}`} 
                                            className="activity-item" 
                                            onClick={() => {
                                                loadPrompt(item);
                                                closeModal();
                                            }}
                                        >
                                            <div className="activity-icon">
                                                <img src={assets.message_icon} alt="Message"/>
                                            </div>
                                            <div className="activity-details">
                                                <p className="activity-prompt">{item}</p>
                                                <span className="activity-time">Recent activity</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-activity">
                                        <img src={assets.history_icon} alt="No history" className="no-activity-icon"/>
                                        <p>No activity yet</p>
                                        <span>Start a conversation to see your history here!</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettings && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content settings-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Settings</h2>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="settings-section">
                                <h3>⚙️ General Settings</h3>
                                <div className="setting-item">
                                    <label className="setting-label">
                                        <div className="setting-info">
                                            <span className="setting-title">Enable notifications</span>
                                            <span className="setting-description">Get notified about new features</span>
                                        </div>
                                        <input type="checkbox" defaultChecked className="setting-checkbox"/>
                                    </label>
                                </div>
                                <div className="setting-item">
                                    <label className="setting-label">
                                        <div className="setting-info">
                                            <span className="setting-title">Save chat history</span>
                                            <span className="setting-description">Keep your conversations saved</span>
                                        </div>
                                        <input type="checkbox" defaultChecked className="setting-checkbox"/>
                                    </label>
                                </div>
                                <div className="setting-item">
                                    <label className="setting-label">
                                        <div className="setting-info">
                                            <span className="setting-title">Auto-scroll to new messages</span>
                                            <span className="setting-description">Automatically scroll when new messages arrive</span>
                                        </div>
                                        <input type="checkbox" defaultChecked className="setting-checkbox"/>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="settings-section">
                                <h3>🎨 Appearance</h3>
                                <div className="setting-item">
                                    <label className="setting-label-vertical">
                                        <span className="setting-title">Theme</span>
                                        <select className="setting-select">
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                            <option value="auto">Auto (System)</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="setting-item">
                                    <label className="setting-label-vertical">
                                        <span className="setting-title">Font Size</span>
                                        <select className="setting-select">
                                            <option value="small">Small</option>
                                            <option value="medium">Medium</option>
                                            <option value="large">Large</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="settings-section">
                                <h3>🗑️ Data Management</h3>
                                <div className="setting-item">
                                    <button className="danger-btn" onClick={clearHistory}>
                                        Clear All Chat History
                                    </button>
                                    <p className="danger-warning">⚠️ This action cannot be undone</p>
                                </div>
                            </div>
                            
                            <div className="settings-section">
                                <h3>ℹ️ About</h3>
                                <div className="about-info">
                                    <p><strong>Version:</strong> 1.0.0</p>
                                    <p><strong>Build:</strong> 2024.12.30</p>
                                    <p><strong>License:</strong> MIT</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;