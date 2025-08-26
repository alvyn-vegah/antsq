
import Footersection from '@/sections/Footersection';
import React from 'react';

const RSSPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br primarybg">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 text-stone-900">
        <h1 className="text-6xl md:text-7xl my-4 font-semibold drop-shadow-lg text-red-800">
          RSS Feeds
        </h1>
      </section>

       {/* RSS Information Section */}
       <main className="max-w-5xl mx-auto px-6 pb-12">
        <div className="business backdrop-blur-sm rounded-xl p-8 mb-8 shadow-2xl border border-stone-700/30">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            What is RSS (Or how do I subscribe to a feed)?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Antsq.com enables you to subscribe to our web feeds to spare yourself the trouble of having to visit our site. Using a 
            web feed allows you to see when Antsq.com has added new content. You can get the latest web stories, features and 
            opinions, press releases, investor updates, and blog posts without having to visit the site every day.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            A web feed is a data format used to serve frequently updated content to users. RSS (an abbreviation for Really Simple 
            Syndication) is a standard web feed format.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            How can I read web feeds from Antsq.com?
          </h3>
          <p className="text-gray-700 leading-relaxed mb-8">
            To read feeds from Antsq.com, you need a feed reader. A feed reader is a tool that provides a new update every time 
            one of your subscribed Antsq.com feeds updates its content. There are many online feed readers - examples: 
            Feedburner, Bloglines, Google Reader, etc. You can also download some feed readers to your desktop.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            How can I add feeds to my feed reader?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            You can either click the relevant links (e.g. the &quot;add to my Yahoo!&quot; button, if you&apos;re using My Yahoo!) or copy-paste the 
            link into your feed reader. Sometimes, you will be able to click a button for your particular feed reader on the 
            Antsq.com web page, which will take you to the appropriate subscription page. Feed aggregators like Feedburner are 
            designed to help you easily add new feeds (in a variety of formats) to your preferred feed reader.
          </p>
        </div>
      </main>
      <Footersection />
    </div>
  );
};

export default RSSPage;