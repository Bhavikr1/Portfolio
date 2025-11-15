'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CommunicationChannels() {
  const [transmitting, setTransmitting] = useState(false);

  const channels = [
    {
      type: 'DIRECT COMM LINK',
      protocol: 'EMAIL',
      address: 'bhavikramina99@gmail.com',
      status: 'SECURE',
      latency: '< 1ms',
      icon: '📧',
    },
    {
      type: 'NETWORK NODE',
      protocol: 'LINKEDIN',
      address: 'bhavik-ramina-161076211',
      status: 'ACTIVE',
      latency: '< 5ms',
      icon: '💼',
    },
    {
      type: 'CODE REPOSITORY',
      protocol: 'GITHUB',
      address: 'Available on request',
      status: 'PRIVATE',
      latency: '< 10ms',
      icon: '💻',
    },
    {
      type: 'LOCATION BEACON',
      protocol: 'PHYSICAL',
      address: 'Mumbai, Maharashtra, India',
      status: 'ACTIVE',
      latency: 'N/A',
      icon: '📍',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-mono text-2xl font-bold text-accent mb-2">COMMUNICATION CHANNELS</h2>
        <p className="font-mono text-sm text-accent/60">Establish secure connection with core user</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Channels list */}
        <div className="col-span-1 space-y-4">
          {channels.map((channel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-accent/30 rounded-lg p-4 hover:border-accent/60 transition-all group"
            >
              <div className="flex items-start space-x-3">
                <div className="text-3xl mt-1">{channel.icon}</div>
                <div className="flex-1">
                  <div className="font-mono text-xs text-accent/50 mb-1">
                    {channel.type}
                  </div>
                  <div className="font-mono text-sm text-accent font-bold mb-1">
                    {channel.protocol}
                  </div>
                  <div className="font-mono text-xs text-accent/70 mb-2 break-all">
                    {channel.address}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={`font-mono text-xs ${
                      channel.status === 'SECURE' ? 'text-green-400' :
                      channel.status === 'ACTIVE' ? 'text-accent' :
                      'text-yellow-400'
                    }`}>
                      {channel.status}
                    </div>
                    <div className="font-mono text-xs text-accent/50">
                      {channel.latency}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Contact form */}
        <div className="col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-black/60 backdrop-blur-xl border border-accent/30 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-mono text-lg font-bold text-accent mb-1">
                  ESTABLISH SECURE CHANNEL
                </h3>
                <p className="font-mono text-xs text-accent/60">
                  Encrypted end-to-end communication protocol
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-400"
                />
                <span className="font-mono text-xs text-green-400">READY</span>
              </div>
            </div>

            <form className="space-y-4">
              {/* Name */}
              <div>
                <label className="font-mono text-xs text-accent/60 mb-2 block">
                  OPERATOR IDENTITY
                </label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-black/50 border border-accent/30 rounded font-mono text-sm text-accent placeholder:text-accent/30 focus:border-accent focus:outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-mono text-xs text-accent/60 mb-2 block">
                  CONTACT PROTOCOL (EMAIL)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-black/50 border border-accent/30 rounded font-mono text-sm text-accent placeholder:text-accent/30 focus:border-accent focus:outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="font-mono text-xs text-accent/60 mb-2 block">
                  TRANSMISSION CONTENT
                </label>
                <textarea
                  rows={6}
                  placeholder="Enter your message... All communications are encrypted."
                  className="w-full px-4 py-3 bg-black/50 border border-accent/30 rounded font-mono text-sm text-accent placeholder:text-accent/30 focus:border-accent focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setTransmitting(true);
                  setTimeout(() => setTransmitting(false), 3000);
                }}
                disabled={transmitting}
                className="w-full px-6 py-3 bg-accent/10 border-2 border-accent hover:bg-accent hover:text-black font-mono text-sm font-bold text-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {transmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full"
                    />
                    <span>TRANSMITTING...</span>
                  </div>
                ) : (
                  <>
                    <span>INITIATE TRANSMISSION</span>
                    <div className="absolute inset-0 bg-accent/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </>
                )}
              </button>
            </form>

            {/* Security notice */}
            <div className="mt-6 pt-4 border-t border-accent/20">
              <div className="flex items-start space-x-2">
                <div className="w-4 h-4 mt-0.5 border border-accent/40 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-accent/40" />
                </div>
                <div className="font-mono text-xs text-accent/50 leading-relaxed">
                  All transmissions are encrypted using military-grade protocols. Response time:
                  <span className="text-accent"> &lt; 24 hours</span>. Your data is secure and will
                  not be shared with third parties.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 bg-gradient-to-r from-accent/10 to-transparent border border-accent/30 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-sm text-accent/80">
                <span className="text-accent/60">PREFERRED CHANNEL:</span>
                {' '}Email for fastest response
              </div>
              <div className="font-mono text-sm text-accent/80">
                <span className="text-accent/60">AVAILABILITY:</span>
                {' '}24/7 Automated Response
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
