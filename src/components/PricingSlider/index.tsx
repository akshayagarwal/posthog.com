import React, { useState, useEffect } from 'react'
import { useValues, useActions } from 'kea'
import { pricingSliderLogic } from './pricingSliderLogic'
import { LogSlider, sliderCurve } from './LogSlider'

interface PricingSliderProps {
    pricingOption: 'cloud' | 'vpc'
}

export const PricingSlider = ({ pricingOption }: PricingSliderProps) => {
    const { sliderValue } = useValues(pricingSliderLogic)
    const { setSliderValue } = useActions(pricingSliderLogic)

    const [finalCost, setFinalCost] = useState(0)
    const [additionalUnitPrice, setAdditionalUnitPrice] = useState(0.000225)

    const calculateVpcPricing = (value: number) => {
        setSliderValue(value)

        let unitPricing = 0.000225

        const estimatedCost = value * unitPricing
        let finalCost = estimatedCost > 2000 ? estimatedCost : 2000

        if (value >= 10000000 && value < 100000000) {
            unitPricing = 0.000045
            finalCost = 10000000 * 0.000225 + (value - 10000000) * 0.000045
        } else if (value >= 100000000) {
            unitPricing = 0.000009
            finalCost = 10000000 * 0.000225 + 100000000 * 0.000045 + (value - 100000000) * 0.000009
        }

        setAdditionalUnitPrice(unitPricing)
        setFinalCost(Math.round(finalCost))
    }

    useEffect(() => {
        if (pricingOption === 'vpc') {
            calculateVpcPricing(sliderValue)
        }
    }, [pricingOption])

    return (
        <>
            <div className="main-price">
                {pricingOption === 'vpc' ? (
                    <div>
                        First <b>8,000,000</b> events are included every single month.
                    </div>
                ) : (
                    <div>
                        First <b>1,000,000 events are free</b> every single month.
                    </div>
                )}
            </div>
            <br />
            <div>
                <LogSlider
                    min={10000}
                    max={150000000}
                    marks={[10000, 100000, 1000000, 10000000, 100000000]}
                    stepsInRange={100}
                    onChange={(value) => {
                        if (pricingOption === 'vpc') {
                            calculateVpcPricing(Math.round(sliderCurve(value)))
                            return
                        }
                        setSliderValue(Math.round(sliderCurve(value)))
                    }}
                />
                <br />
                <br />
                <div>
                    <strong>
                        {pricingOption === 'vpc' ? `$${additionalUnitPrice}` : '$0.000225'}
                        <span>/additional event ingested</span>
                    </strong>
                    {pricingOption === 'vpc' ? (
                        <span> - decreases as volume grows. See it with the calculator.</span>
                    ) : null}
                </div>
                <br />

                <div>
                    <br />
                    {pricingOption === 'vpc' ? (
                        <div style={{ fontSize: '1rem', textAlign: 'right', marginTop: 5 }}>
                            <span className="text-muted">Price:</span> <b>${finalCost}</b>/month.
                        </div>
                    ) : (
                        <div style={{ fontSize: '1rem', textAlign: 'right', marginTop: 5 }}>
                            <span className="text-muted">Price:</span>{' '}
                            <b>${Math.round(Math.max(0, sliderValue - 1000000) * 0.000225).toLocaleString()}</b>/month
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
