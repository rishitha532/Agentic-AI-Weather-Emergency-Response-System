Reliable estimation of key meteorological variables is essential for downstream tasks in disaster identification and severity classification. We evaluate our model’s performance on two core variables  temperature and wind speed  by comparing model predictions with ground-truth measurements collected from recent weather events.

#### Temperature Prediction (RMSE = 3.36°C)

<div align="center">
  <img src="static/assets/img/temp.png" alt="Figure 1: True vs Predicted Temperature" width="600"/>
  <p style="font-size: 0.9em;"><b>Figure 1:</b> True vs Predicted Temperature</p>
</div>

In Figure 1, the model demonstrates a strong correlation between predicted and true temperature values, with a Root Mean Square Error (RMSE) of 3.36°C. The regression line closely follows the ideal fit, indicating that the model successfully captures thermal dynamics even under moderate environmental noise. Slight deviations at the extremities suggest a need for broader calibration across high-variance urban microclimates.


#### Wind Speed Prediction (RMSE = 2.70 km/h)

<p align="center"> <img src="static/assets/img/wind.png" alt="Figure 2: True vs Predicted Wind Speed" width="600"/><br> <b>Figure 2: True vs Predicted Wind Speed</b> </p>
As shown in Figure 2, the model’s wind speed predictions exhibit an RMSE of 2.70 km/h, with predictions clustering around the ideal line. The spread increases slightly at higher speeds, a common trait in wind modeling due to sparse high-intensity event data. Nevertheless, the model remains sufficiently calibrated to distinguish between benign and risk-prone wind conditions, critical for triggering wind-sensitive response workflows such as civil defense or public works alerts.


#### Implications for Disaster Reasoning

These predictive outputs serve as foundational inputs to the agent’s LLM-driven disaster type classification and severity assessment modules. Accurate forecasting of temperature and wind enables the system to:

* Detect early signals of heatwaves, storms, or floods based on domain thresholds.

*  Quantify event severity with greater confidence and trigger the correct departmental response via conditional StateGraph routing.

*  Reduce reliance on post-facto social signals by anchoring initial classification in real-time meteorological evidence.

The agent's end-to-end architecture thus benefits from low regression error, which translates directly into more precise, interpretable, and verifiable disaster response planning.


### Evaluation of Disaster Identification and Severity Estimation

We quantitatively assess our agent’s performance across two critical subtasks: weather disaster type classification and severity level estimation. Both modules were evaluated on a held-out test set using true-predicted alignment metrics and confusion matrices.

#### Disaster Type Classification.

As visualized in Figure 3 (left), our classifier effectively distinguishes among common disaster scenarios, achieving 78% accuracy and an F1-score of 0.79. The model maintains high precision (0.84) across most classes. Notably, “Clear” and “Cloudy” classes are robustly predicted with minimal cross-contamination. Misclassifications predominantly occur between “Rainy” and “Cloudy” events, which share similar low-frequency environmental signals such as moderate precipitation and overcast patterns. This ambiguity is exacerbated in borderline cases, which suggests that contextual temporal features, such as preceding hours of wind gust or barometric drops, could further disambiguate these classes.

#### Severity Assessment.

As shown in Figure 3 (right), the model demonstrates strong ability to isolate low-severity cases, with 32 out of 39 correctly classified. The classifier achieves 74% accuracy, precision of 0.79, and F1-score of 0.76. While high-severity predictions are occasionally downgraded to medium (and vice versa), such confusion aligns with the inherently soft boundaries between escalation tiers, especially when dependent on incomplete real-time data. This reflects a key challenge in emergency decision-making pipelines: ensuring sufficient sensitivity to escalate critical cases while avoiding alert fatigue from false positives.

#### Aggregate Performance.

The full evaluation matrix in Table 1 summarizes the predictive capacity of our system. The results affirm that LLM-guided classification—when grounded in structured sensor inputs can achieve performance on par with traditional meteorological classifiers, while additionally offering interpretability and routing capabilities absent in black-box CNNs or shallow ensembles.

<p align="center"> <img src="static/assets/img/class.png" alt="Confusion matrices" width="800"/> </p> <p align="center" style="font-size: 0.9em;"><b>Figure 3:</b> Left: Confusion matrix for disaster classification across six weather categories. Right: Confusion matrix for severity estimation. Most errors occur near class boundaries.</p> <p align="center"> <img src="static/assets/img/metrics.jpg" alt="Metrics table" width="300"/> </p> <p align="center" style="font-size: 0.9em;"><b>Table 1:</b> Precision, recall, accuracy, and F1-score for the disaster and severity classifiers.</p>


#### Real-World Simulation & Verification

To validate the operational fidelity of our hybrid AI agent, we executed end-to-end runs under both simulated and real-world conditions. The system supports dual execution modes: (1) simulated runs for testing specific severity scenarios and (2) real-time monitoring with live data ingestion from OpenWeather and News APIs. This duality enables both rapid development iteration and trustworthy real-world deployment.

<p align="center">
  <img src="static/assets/img/code1.jpg" alt="Figure 4: Agent Execution Code" width="700"/>
</p>
<p align="center"><em>Figure 4: Core agent code that runs periodic monitoring and conditional email alerts</em></p>


Figure 4 illustrates the interactive control logic presented to the user at runtime. Upon launch, users are prompted to choose between simulated and real-time modes. In simulation mode, severity levels are injected directly via pre-defined weather profiles, enabling controlled testing of routing logic and human-in-the-loop approval mechanisms. In contrast, real-time mode ingests live weather data and synthesizes social signals for dynamic classification.

#### Human-in-the-Loop Verification in Action

In our real-time trial for College Station, Texas (Figure 5), the system identified a Medium severity condition under “Heavy Intensity Rain” weather, with a temperature of 18.33°C and wind speed of 8.13 m/s. Given the medium severity threshold, the alert was routed through a human verification loop, prompting the operator for approval before escalation. Upon approval (Figure 6), the system dispatched an alert via SMTP-secured email to the designated stakeholders.

<p align="center">
  <img src="static/assets/img/monitor.jpg" alt="Figure 5: Console Weather Monitoring" width="700"/>
</p>
<p align="center"><em>Figure 5: Agent execution on College Station showing low-severity weather and verification prompt</em></p>

<p align="center">
  <img src="static/assets/img/email.jpg" alt="Figure 6: Email Alert Process" width="700"/>
</p>
<p align="center"><em>Figure 6: Email sent via SSL after human approval for low-severity alert</em></p>

This approval flow adds interpretability and accountability to otherwise automated models, ensuring that mild alerts do not cause unnecessary panic. It also validates the agent's ability to generate structured, human-readable summaries contextualized with environmental variables and severity rationale.

#### Multi-Source Reasoning with News Signal Fusion

In a similar real-time run for New Delhi, India, the system successfully aggregated six recent news headlines discussing heat stress, rainfall, and power outages (Figure 7). These were included in the alert email to provide situational grounding. This demonstrates the agent’s capability to synthesize unstructured web content and augment its forecasts with public sentiment and media coverage, a core differentiator of our hybrid pipeline.

The quantitative accuracy of the classification was further supported by third-party weather logs (Figure 8), validating model-predicted parameters against ground truth.

<p align="center">
  <img src="static/assets/img/delhi.jpg" alt="Figure 7: New Delhi Low Severity Email" width="700"/>
</p>
<p align="center"><em>Figure 7: Low-severity weather alert email for New Delhi with news evidence</em></p>

<p align="center">
  <img src="static/assets/img/weather.jpg" alt="Figure 8: New Delhi Weather Chart" width="700"/>
</p>
<p align="center"><em>Figure 8: Actual temperature and wind profile from New Delhi (April 22, 2025)</em></p>

#### Simulated High Severity Case Study

To test high-severity routing without needing real-world events, we injected a synthetic scenario simulating a severe storm in Dallas (Figure 9). The agent inferred a "Severe thunderStorm with heavy rainfall" label from elevated wind speed (32.5 m/s), 90% humidity, and dense cloud cover, triggering automatic response routing without human verification. The system correctly bypassed manual steps and issued an immediate emergency alert, consistent with our design for rapid disaster escalation.

This confirms the model's ability to route decision flows based on severity context, balancing agility with prudence. In critical conditions, speed trumps deliberation, and the model demonstrates that distinction effectively.

<p align="center">
  <img src="static/assets/img/dallas.jpg" alt="Figure 9: Dallas High Severity Alert" width="700"/>
</p>
<p align="center"><em>Figure 9: Automatically triggered emergency alert for Dallas due to high wind and rain</em></p>

#### Summary

This series of live and simulated tests validates the real-world readiness of our hybrid AI agent. From data ingestion to alert dispatch, the system demonstrates robustness across modalities, interpretability through language model reasoning, and reliability via human-in-the-loop safeguards. Its integration of news signals and quantitative thresholds reflects an architecture designed not just for prediction, but for informed, accountable action.
