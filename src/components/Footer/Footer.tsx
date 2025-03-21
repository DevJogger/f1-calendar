'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import SiteSelector from '../../components/SiteSelector/SiteSelector';
import YearSelector from '../../components/YearSelector/YearSelector';
//import {usePlausible} from "next-plausible";
import EmailIcon from '../Icons/EmailIcon';
import Link from 'next/link';

const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

const Footer = () => {
  const t = useTranslations('All');

  const [showHomeScreenPrompt, setShowHomeScreenPrompt] = useState(false);

  useEffect(() => {
    var standalone =
      'standalone' in window.navigator && window.navigator.standalone;
    var iOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    var prompt = window.localStorage.a2hs_message;

    if (iOS && !standalone && !prompt && config.supportsWebPush) {
      setShowHomeScreenPrompt(true);
    }
  }, []);

  const dismissPrompt = () => {
    localStorage.setItem('a2hs_message', true);
    setShowHomeScreenPrompt(false);
  };

  return (
    <>
      <footer className="max-w-screen-lg mx-auto mt-2 md:mt-10 px-0 sm:px-2">
        <div className="max-w-7xl mx-auto overflow-hidden md:hidden">
          <div className="mt-1 mb-6 flex justify-center space-x-6">
            <LanguageSelector />
          </div>

          <div className="mt-1 mb-6 flex justify-center space-x-6">
            <SiteSelector />
          </div>

          <div className="mt-1 mb-6 flex justify-center space-x-6">
            <YearSelector />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4 px-2 text-center md:text-left">
          <div>
            <p className="text-base text-gray-400 mb-2">
              &copy; {new Date().getFullYear()}{' '}
              <a
                href="https://andydev.co.uk"
                rel="author"
                className="text-gray-300"
              >
                Andrew Yates
              </a>
              ,&nbsp;
              <a
                href="https://andyhiggs.uk/"
                rel="author"
                className="text-gray-300"
              >
                Andy Higgs
              </a>
              ,&nbsp;
              <a
                href="https://sijobling.com"
                rel="author"
                className="text-gray-300"
              >
                Si Jobling
              </a>{' '}
            </p>

            <p className="text-base text-gray-400 text-xsm px-2 md:px-0">
              {t(`${process.env.NEXT_PUBLIC_SITE_KEY}.footnote`)}
            </p>

            <p className="text-base text-gray-400 text-xsm px-2 md:px-0">
              <Link href={`years`}>Years</Link>
              {' • '}
              <Link href={`timezones`}>Timezones</Link>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto overflow-hidden pb-8 pt-2">
          <div className="hidden md:block text-center mt-8">
            <YearSelector />
          </div>
        </div>
      </footer>

      {showHomeScreenPrompt && (
        <div
          className="relative z-99999"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-2 text-center sm:mt-0 sm:text-left">
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-4">
                        {t(`footer.homescreen`)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={dismissPrompt}
                  >
                    Got it
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
