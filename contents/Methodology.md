<p align="center">
  <img src="static/assets/img/method.jpg" alt="System Workflow Diagram" width="700"/>
</p>


Our proposed system integrates real-time weather analysis, multi-source data fusion, and intelligent routing to enhance emergency response coordination during severe weather events. The core methodology consists of three tightly coupled components: (1) data ingestion and disaster classification, (2) severity assessment and routing logic, and (3) response orchestration with large language model (LLM) support.

#### Multi-Modal Data Ingestion and Classification
The first stage of the pipeline focuses on collecting and organizing heterogeneous data streams into a coherent disaster signal. Structured weather data is ingested via the OpenWeather API, capturing high-resolution meteorological variables such as precipitation, temperature, wind speed, and pressure. In parallel, unstructured information is retrieved from News APIs and social media feeds through secure HTTPS endpoints. These sources contribute valuable situational awareness, often surfacing signals prior to formal reports.

The core objective at this stage is event detection and preliminary classification. A preprocessing module normalizes and synchronizes temporal and spatial metadata, after which the system leverages Gemini 1.5 Flash to synthesize these inputs. The LLM is applied strictly in the context of signal fusion and type classification: it interprets noisy textual content, extracts entities (e.g., location, disaster keywords), and disambiguates overlapping narratives. For example, it distinguishes between infrastructure failures and atmospheric events when both appear in early reports.

Importantly, this stage does not perform severity estimation or routing, but establishes a reliable event label (e.g., “localized flood,” “storm onset”) that informs downstream modules. Outputs are routed through a human-verification layer to ensure that false positives are not escalated prematurely. Approved events are handed off to the severity analysis and orchestration modules for deeper processing.

#### Severity Assessment and Data Logging
Once the event has been classified, the system shifts focus to quantifying the potential impact. The Severity Assessment Module evaluates environmental variables such as rainfall intensity, wind thresholds, and proximity to critical infrastructure in conjunction with socio-demographic data like population density and evacuation readiness. Unlike fixed-rule models, this module operates on a flexible scoring matrix, allowing dynamic adjustment to location-specific baselines.

Assessment results are recorded in a persistent, time-stamped log for retrospective audits and real-time dashboards. The system supports both JSON-based structured outputs and time-series entries compatible with cloud analytics platforms. This logging layer forms the backbone for institutional memory, enabling disaster analytics teams to calibrate response models over time.

#### Intelligent Response Orchestration with LLM Integration
This stage operationalizes the event insights by transforming classification and severity outputs into actionable coordination strategies. Unlike the earlier classification use, the LLM here functions as a high-level planner. Taking as input the confirmed disaster type and severity score, Gemini 1.5 Flash evaluates contextual parameters such as resource availability, regional risk profiles, and infrastructure dependencies.

Rather than analyzing raw data, the LLM focuses on policy formulation and path optimization. For example, in the case of a confirmed flood event with moderate severity, the model might recommend deploying public works units for drainage restoration, whereas a high-severity storm in a dense urban area would trigger civil defense alerts and initiate evacuation protocols. The model conditions its decisions on evolving constraints, including blocked transportation routes, power outages, and available shelter capacity.

For dynamic scenarios such as hurricanes or wildfires, the system activates a reinforcement learning-based routing engine, guided by LLM-generated directives. This module calculates optimal evacuation paths and supply chain movements, minimizing risk exposure while ensuring timely support deployment. The integration of predictive reasoning and real-time optimization makes the system robust to cascading and multi-region events.

#### Output and Alerts
For any validated and actionable event, the system triggers alert notifications via SMTP over SSL, delivering structured situational reports to relevant stakeholders. These alerts include disaster type, severity rating, recommended response protocol, and supporting metadata. The alert system is designed with redundancy and fail-safes, ensuring delivery even in the event of partial system failure or degraded infrastructure.

#### Summary
Our methodology emphasizes a modular separation of concerns: data ingestion and classification are confined to event identification, severity scoring is handled in a dedicated evaluation module, and orchestration logic is reserved for high-level response formulation. This division enables clarity, extensibility, and real-time performance. By leveraging multi-source data fusion, large language model reasoning, and simulation-driven planning, the system delivers resilient, intelligent, and human-verifiable disaster response recommendations fit for modern emergency coordination.

