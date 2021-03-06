import React from 'react';

export default () =>
    <footer>
        <div>
            <a href="https://www.holderdeord.no/">
                <div
                    className="hdo-logo"
                    style={{ backgroundPosition: '50% 0', margin: '0' }}
                />
            </a>

            <h4>
                Holder de ord &copy; {new Date().getFullYear()}
            </h4>

            <div>
                <small>
                    <div>
                        Kildekode på{' '}
                        <a href="https://github.com/holderdeord/hdo-promise-tracker">
                            GitHub
                        </a>{' '}
                        lisensiert under{' '}
                        <a href="http://opensource.org/licenses/BSD-3-Clause">
                            BSD
                        </a>.

                        <p>Du kan <a href="https://files.holderdeord.no/data/csv/loftesjekk-2017.csv">laste ned hele datasettet</a> som CSV.</p>
                    </div>


                    <div>
                        Spørsmål? Ta{' '}
                        <a
                            href="mailto:&#107;&#111;&#110;&#116;&#97;&#107;&#116;&#64;&#104;&#111;&#108;&#100;&#101;&#114;&#100;&#101;&#111;&#114;&#100;&#46;&#110;&#111;"
                            style={{ textDecoration: 'underline' }}
                        >
                            kontakt
                        </a>.
                    </div>
                </small>
            </div>

            <p className="links">
                <a href="https://www.holderdeord.no/" alt="Holder de ord">
                    holderdeord.no
                </a>
                &nbsp;&middot;&nbsp;
                <a
                    href="https://twitter.com/holderdeord/"
                    alt="Holder de ord på Twitter"
                >
                    @holderdeord
                </a>
            </p>
        </div>
    </footer>;
